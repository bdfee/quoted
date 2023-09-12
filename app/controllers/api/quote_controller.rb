module Api
    class QuoteController < ApplicationController
      require 'net/http'
      require 'json'
      require 'openai'
  
      @@openai_client ||= OpenAI::Client.new

      def index
        quote = get_quote
  
        wiki = get_wiki(quote['author'])
  
        false_quote = get_false_quote(quote['content'], quote['author'])
  
        render json: {
          quote: quote['content'],
          author: quote['author'],
          snippet: wiki['snippet'],
          image_url: wiki['image_url'],
          false_quote: false_quote
        }
      end
  
      private
  
      def get_quote
        uri = URI('https://api.quotable.io/quotes/random')
        res = Net::HTTP.get(uri)
        data = JSON.parse(res)
        {
          "content" => data[0]['content'],
          "author" => data[0]['author']
        }
      end
  
      def get_wiki(author)
        uri = URI("https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&titles=#{URI.encode_www_form_component(author)}&prop=extracts|pageimages&exintro&explaintext&pithumbsize=300")
        res = Net::HTTP.get(uri)
        data = JSON.parse(res)
  
        page_id = data['query']['pages'].values.first['pageid'].to_i
        {
          "snippet" => data['query']['pages'][page_id.to_s]['extract'].split('. ')[0] + '.',
          "image_url" => data['query']['pages'][page_id.to_s]['thumbnail']&.fetch('source', nil)
        }
      end
  
      def get_false_quote(quote, author)
        # client = OpenAI::Client.new
  
        input_string = 'rewrite: ' + quote + 'in the style of ' + author

        res = @@openai_client.chat(
            parameters: {
              messages: [
                { role: 'system', content: 'You are a helpful assistant that generates a false quote based on the original quote and author. It is a game, return only the false quote that you generate without any hints as to whether it is the original or not' },
                { role: 'user', content: input_string }
              ],
              model: 'gpt-3.5-turbo'
            }
          )
        
        JSON.parse(res["choices"][0]["message"]["content"])
      end
    end
  end

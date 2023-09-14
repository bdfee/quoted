class ScoreService
    def initialize(score_type, user_id)
        @score_type = score_type
        @user_id = user_id
    end
  
    def increment_global_score
        global_score = GlobalScore.first_or_initialize
  
        if @score_type == 'correct'
            global_score.increment!(:correct_responses)
        elsif @score_type == 'incorrect'
            global_score.increment!(:incorrect_responses)
        end
  
        global_score.save
  
        # Return the updated global_score
        global_score
    end
  
    def increment_user_score
        return unless @user_id
  
        score = Score.find_or_initialize_by(user_id: @user_id)
  
        if @score_type == 'correct'
            score.increment!(:correct_responses)
        elsif @score_type == 'incorrect'
            score.increment!(:incorrect_responses)
        end
  
        # we calcualte and store the ranking on each DB write for easy query of leaderboard
        score.ranking_score = calculate_ranking_score(score)
  
        score.save
  
        # Return the updated user score
        score
    end
  
    def calculate_ranking_score(score)
        correct_percentage = score.correct_responses.to_f / (score.correct_responses + score.incorrect_responses)
        score.correct_responses * correct_percentage
    end
  end

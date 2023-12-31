# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_230_914_155_012) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'btree_gin'
  enable_extension 'btree_gist'
  enable_extension 'citext'
  enable_extension 'cube'
  enable_extension 'dblink'
  enable_extension 'dict_int'
  enable_extension 'dict_xsyn'
  enable_extension 'earthdistance'
  enable_extension 'fuzzystrmatch'
  enable_extension 'hstore'
  enable_extension 'intarray'
  enable_extension 'ltree'
  enable_extension 'pg_stat_statements'
  enable_extension 'pg_trgm'
  enable_extension 'pgcrypto'
  enable_extension 'pgrowlocks'
  enable_extension 'pgstattuple'
  enable_extension 'plpgsql'
  enable_extension 'tablefunc'
  enable_extension 'unaccent'
  enable_extension 'uuid-ossp'
  enable_extension 'xml2'

  create_table 'global_scores', force: :cascade do |t|
    t.integer 'correct_responses', default: 0
    t.integer 'incorrect_responses', default: 0
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'scores', force: :cascade do |t|
    t.bigint 'user_id', null: false
    t.integer 'correct_responses', default: 0
    t.integer 'incorrect_responses', default: 0
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.decimal 'ranking_score', precision: 10, scale: 2, default: '0.0'
    t.index ['user_id'], name: 'index_scores_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'username', null: false
    t.string 'password_digest', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  add_foreign_key 'scores', 'users'
end

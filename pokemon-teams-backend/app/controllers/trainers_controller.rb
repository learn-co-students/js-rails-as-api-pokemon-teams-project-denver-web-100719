class TrainersController < ApplicationController

    def index
        trainers = Trainer.all 
        render json: trainers, include: :pokemons
    end

    def add_pokemon
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        Pokemon.create(nickname: name, species: species, trainer_id: params[:id])
    end

end

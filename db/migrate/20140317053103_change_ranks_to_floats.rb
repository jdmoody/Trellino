class ChangeRanksToFloats < ActiveRecord::Migration
  def change
    change_column :lists, :rank, :float
    change_column :cards, :rank, :float
  end
end

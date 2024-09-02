mongoexport --db=standby --collection=shooters --type=csv --out=tpmonline.shooters.csv --fields=_id,name,email,category,docnum --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=uuuuuuuuuu --password=ppppppppp
sed -i '' 's/ObjectId(\([[:alnum:]]*\))/\1/g' tpmonline.shooters.csv

mongoexport --db=standby --collection=ranges --type=csv --out=tpmonline.ranges.csv --fields=_id,name,city,state,active,address --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=uuuuuuuuuu --password=ppppppppp
sed -i '' 's/ObjectId(\([[:alnum:]]*\))/\1/g' tpmonline.ranges.csv

mongoexport --db=standby --collection=events --type=csv --out=tpmonline.events.csv --fields=_id,name,date,dateDuel,public,clock,duel,randomDuel,vl_first_try,vl_second_try,vl_third_try,vl_other_tries,rangeId --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=uuuuuuuuuu --password=ppppppppp
sed -i '' 's/ObjectId(\([[:alnum:]]*\))/\1/g' tpmonline.events.csv

mongoexport --db=standby --collection=guns --type=csv --out=tpmonline.guns.csv --fields=_id,type,factory,model,caliber,operation --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=uuuuuuuuuu --password=ppppppppp
sed -i '' 's/ObjectId(\([[:alnum:]]*\))/\1/g' tpmonline.guns.csv

mongoexport --db=standby --collection=divisions --type=csv --out=tpmonline.divisions.csv --fields=_id,name,eventId,categories,advanceLimit --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=uuuuuuuuuu --password=ppppppppp
sed -i '' 's/ObjectId(\([[:alnum:]]*\))/\1/g' tpmonline.divisions.csv

mongoexport --db=standby --collection=shooters_divisions --type=csv --out=tpmonline.shooters_divisions.csv --fields=_id,shooterId,divisionId,eventId,optics,clock,duel,gunId --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=uuuuuuuuuu --password=ppppppppp
sed -i '' 's/ObjectId(\([[:alnum:]]*\))/\1/g' tpmonline.shooters_divisions.csv

mongoexport --db=standby --collection=time_records --type=csv --out=tpmonline.time_records.csv --fields=_id,shooterId,divisionId,eventId,sTime,penalties,shooterDivisionId,datetime --uri="mongodb+srv://cluster0.dmdaadr.mongodb.net/" --username=uuuuuuuuuu --password=ppppppppp
sed -i '' 's/ObjectId(\([[:alnum:]]*\))/\1/g' tpmonline.time_records.csv

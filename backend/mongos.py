import pymongo as pg
db = pg.MongoClient('mongodb+srv://sanjay:connect@cluster0.zpnittb.mongodb.net/?retryWrites=true&w=majority')
print(db.list_database_names())
test = db.get_database('test')
print(test.get_collection('users').find_one())

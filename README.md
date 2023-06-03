# MERN Minute Details - iNotebook

1. Using CMD+SHIFT+. you can navigate to different functions in a file. Whereas using CMD+, will open the settings for you

<br>

2. In order to access "req.body" data you need to do `app.use(express.json())` in the main server file so as to tell express to accept data in json file. Furthermore, you have to include
"Content-Type: application/json" in header of the request for the same reason

<br>

3. In mongo shell, use the following commands:
"To show all databases": show dbs;
"To use a database": use <database_name>
"To list all collections inside a database": show collections; OR db.getCollectionNames(); OR show tables;
"To drop a database when inside that database": db.dropDatabase()
"To drop a collection": db.<collection_name>.drop()

<br>

4. While creating schemas in models, anything from the following would work:
new mongoose.Schema({})
const Schema = mongoose.Schema (at the top), new Schema({})
{}

<br>

5. In my models, unique: true was not working because in my mongodb_uri,i did not use "?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2" at the end of the string. This fixed my problem.

<br>

6. NodeJS uses commonJS as a result importing module in it is different from ReactJS which uses ES6 syntax. Exporting modules is also different in both.

<br>

7. In express-validator, what you can do is pass a second parameter to body function which is a custom message. Like, body("name", "Name can only be between 3 and 50 characters!").

<br>

8. Methods to handle CRUD operations:
.save(), let user = new User(req.body); user.save().then() which saves the user in database with entire details passed through body
.create(), User.create({name: "mehul", email: "e@g.co"}).then() which also saves the user in database but developer can selectively pass the information to be stored

<br>

9. In order to use .env.local,  we can pass an options parameter to the config method and specify the path of .env file as:
require("dotenv").config({ path: ".env.local" }). There is no requirement to write the statement on the left at all, application works without that as well.

<br>

10. In order to establish a foreign key kind of relationship in mongodb.  we can write this in NotesSchema. 
user_id: {
type: Schema.Types.ObjectId,
ref: "user",
}
which basically uses mongoose schema object id as a type and references to the user model

<br>

11. Either import the functions directly like ```const { body, validationResult } = require("express-validator");``` or make a constant and then use methods on it as
 `const validator = require("express-validator"); validator.body('email')`

<br>

12. You only need to use ContentType: application/json when you are sending data from client to server.

<br>

13. To convert new ObjectId("6460f55b1d44c5b437ce967c") to string use the toString() method on it

<br>

14. Explaination of piece of code below:
Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
What $set does is basically take all the things from newNote object and updates those particular fields in our db, if some fields are not mentioned in newNote but exist in db then they remain the same. {new: true} says that if that kind of note does not exist at all then a new note will be created in place of it.

<br>

15. In react-router-dom, when using <Route> component, always pass the entire component as element and not just the component name. Like <Route element={<Home />}> and not 
<Route element={Home}>

<br>

14. React Context API:
My understanding: basically you have to create a context using a variable which is assigned react's createContext() hook. Now what happens is we create a provider function which basically switches on the provider method on that variable. Our main focus during the entire thing is the variable since it is the one having all the capabilities. Now after we have opened the provider method, we use it to wrap our entire app. Now that variable in which the power has been unlocked is accessible to all components in the app. Now to use it all we have to do is import that variable and pass it to useContext in order to use its powers. And voila, we are done!

<br>

15. In {notes.map(note => ())}, you can notice that arrow function uses () instead of {}. This is not a bug, instead it is known as immediate return. This in itself means to return the output immediately on the screen. If you use {}, then you must write {notes.map(note => { return something; })}. Basically () means that you are returning something and so you dont need to specify otherwise.

<br>

16. When using objects, if you want to do this, 
const name = "mehul"
const obj = {name: "srivastava"}, then the object created has the key name and not mehul. In order to change code so that it accepts mehul as the key, we need to do this - 
const obj = {[name]: "srivastava"}, that is, wrap the key in square brackets

<br>

17. The trick - (condition && render_html) is used when you want to use ternary operator but dont have anything in else operator, that is, when you want to use
(condition ? render_html : <no else statement>)



<br><br>

### IMPORTANT LEARNINGS FROM REACT DOCUMENTATION
1. Never mutate a state directly, that is, form.firstName = 'Taylor' is wrong. Instead a update the object like this  - setForm({...form, firstName: 'Taylor'}); Read more tips and tricks at https://react.dev/reference/react/useState

2. You can never pass refs to child components as props. To do that, you must use forwardRef method on your child component to activate its capabilities. This is done by:
const MyInput = forwardRef(function MyInput(props, ref) { ....code }); 
wrapping forwardRef around your function. Read more at https://react.dev/reference/react/forwardRef

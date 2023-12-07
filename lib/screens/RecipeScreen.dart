import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class RecipeScreen extends StatefulWidget {
  @override
  _RecipeScreenState createState() => _RecipeScreenState();
}
class _RecipeScreenState extends State<RecipeScreen> {
  String message = "", newMessageText = '';
  String loginName = '', password = '';
  String username = GlobalData.loginName;
  List<Map<String, dynamic>> userRecipes = [];
  List<Map<String, dynamic>> userIngredients= [];
  String userIng = '';
  String recipeName= '', thisRecipe= '';
  var defIng;
  int pastaCounter= 0;
  int pizzaCounter= 0;
  int pieCounter= 0;
  Set<String> uniqueRecipeNames = Set<String>();

  @override
  void initState() {
    super.initState();
    fetchUserRecipes();
    fetchUserIngredients();
  }


  Future<void> fetchUserRecipes() async {
    String ret = "";

    try {
      final response= await http.get(
          Uri.parse('http://cop4331group2.com:5000/api/getUserRecipes/${username}')
      );

      if (response.statusCode == 200) {
        print("UR entered if status= 200");
        print(response);
        print(response.body);
        final List<dynamic> jsonResponse = json.decode(response.body);
        pastaCounter= 0;
        pizzaCounter= 0;
        pieCounter= 0;
        print("got past list");
        print(jsonResponse);
        //ret= json.decode(response.body);
        setState(() {
          userRecipes = jsonResponse.map((recipe) {
            if (recipe == 'Pizza') {
              pizzaCounter++;
            }
            if (recipe == 'Lasagna') {
              pastaCounter++;
            }
            if (recipe == 'Apple Pie') {
              pieCounter++;
            }
            return {'Name': recipe};
          }).toList();
          //userRecipes= List<Map<String, dynamic>>.from(jsonResponse);
          print("Recipe list:");
          print(userRecipes);
        });

      } else {
        // Handle errors here
        print('Failed to load user tasks');
      }
    }
    catch(e) {
      print("catch statement");
      print(e.toString());
      ret= "Error Occured";
    }

    try {
      final response= await http.get(
          Uri.parse('http://cop4331group2.com:5000/api/getRecipeIngredients/${thisRecipe}')
      );

      if (response.statusCode == 200) {
        print("URI entered if status= 200");
        print(response.body);
        final List<dynamic> jsonResponse = json.decode(response.body);
        print("got past list");
        print(jsonResponse);
        //ret= json.decode(response.body);
        setState(() {
          //userIng = jsonResponse.map((ing) => {'Ingredients': ing}).toList();
          //userIng= List<Map<String, dynamic>>.from(jsonResponse);
          //defIng= jsonResponse;
          //defIng = jsonResponse.map((recipe) => recipe['Ingredients']).toList();

          userIng= "Ingredients: " + jsonResponse.join(', ');
          print("Recipe list:");
          print(userIng);
          print(defIng);
        });
      } else {
        // Handle errors here
        print('Failed to load user tasks');
      }
    }
    catch(e) {
      print("catch statement");
      print(e.toString());
      ret= "Error Occured";
    }

  }

  Future<void> redeemRecipes(String recipeName) async {
    String ret = "";
    try {
      final response = await http.post(
          Uri.parse(
              'http://cop4331group2.com:5000/api/redeemRecipe/${username}/${recipeName}')
      );

      if (response.statusCode == 200) {
        // Successful deletion
        print('Recipe redeemed successfully');
        // You might want to update your local state or refresh the task list
      } else {
        // Handle errors here
        print('Failed to redeem recipe: ${response.statusCode}');
      }
    }

    catch(e) {
      print("catch statement");
      print(e.toString());
      ret= "Error Occured";
    }
  }


  Future<void> fetchUserIngredients() async {
    String ret = "";
    try {
      final response = await http.get(
          Uri.parse(
              'http://cop4331group2.com:5000/api/getUserIngredients/${username}')
      );

      if (response.statusCode == 200) {
        print("entered fetch INGRE");
        print(response);
        print(response.body);
        final Map<String, dynamic> jsonResponse = json.decode(response.body);
        print("got past list");
        print(jsonResponse);
        //ret= json.decode(response.body);
        setState(() {
          //userIngredients = jsonResponse.map((ingredient) => {'Ingredients': ingredient}).toList();
          //userIngredients= List<Map<String, dynamic>>.from(jsonResponse);
          //userIngredients= jsonResponse;
          //List<Map<String, dynamic>> userIngredients = (jsonResponse.values.toList() as List).cast<Map<String, dynamic>>();
          //List<Map<String, dynamic>> userIngredients = List<Map<String, dynamic>>.from(jsonResponse.values.toList());
          //List<dynamic> userIngredientsList = jsonResponse.values.toList();
          //List<Map<String, dynamic>> userIngredients = List<Map<String, dynamic>>.from(userIngredientsList);


          // Extract the "ingredients" list from the API response
          // Extract the "ingredients" list from the API response
          // Extract the "ingredients" list from the API response
          //List<Map<String, dynamic>> transformedList = [];

          for (var ingredient in jsonResponse['ingredients']) {
            userIngredients.add({"Ingredient": ingredient});
          }

          print("ingredient list:");
          print(userIngredients);
        });

      } else {
        // Handle errors here
        print('Failed to load user tasks');
      }
    }
    catch (e) {
      print("catch statement");
      print(e.toString());
      ret = "Error Occured";
    }
  }

    @override
  Widget build(BuildContext context) {

    return Stack(
      children: <Widget>[
        //Background Image
        Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/PixelBackground1.jpg'),
              fit: BoxFit.cover,
              //height: double.infinity,
              //width: double.infinity,
            ),
          ),
        ),
        Scaffold(
          backgroundColor: Colors.transparent,
          appBar: AppBar(
            backgroundColor: Colors.transparent,
            elevation: 0,
            title: Text('VeggieTasks'),
            centerTitle: true,
            shape: Border(
              bottom: BorderSide(color: Colors.grey.withOpacity(0.2), width: 1.0),
            ),
            leading:
            IconButton(
              icon: Image.asset('assets/VeggieTasksIcon.png'),
              onPressed: (){
                Navigator.pushNamed(context, '/home');
              },
            ),
            actions:[
              IconButton(
                icon: Icon(Icons.more_vert, color: Colors.white),
                onPressed: () {
                  showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return CustomMenuDialog();
                    },
                  );
                },
              ),
            ],
          ),

          body: Center(
            child: Container(

              child: Align(
                alignment: Alignment.topCenter,
                child: Padding(
                  padding: EdgeInsets.only(top: 50.0),
                  child: Column(
                    //mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    //crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
                    children: [

                      ElevatedButton(
                        onPressed: () async
                        {
                          _showRecipeMenu(context);
                        },
                        style: ElevatedButton.styleFrom(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20.0)
                            ),
                            backgroundColor: Colors.yellow[100],
                            foregroundColor: Colors.black,
                            padding: EdgeInsets.all(10.0),
                            disabledBackgroundColor: Colors.yellow[100]
                        ),
                        child: Text('Available Recipes',
                            style: TextStyle(fontSize: 18, color: Colors.black)),
                      ),

                      ElevatedButton(
                        onPressed: () async
                        {
                          _showIngredients(context);
                        },
                        style: ElevatedButton.styleFrom(
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20.0)
                            ),
                            backgroundColor: Colors.yellow[100],
                            foregroundColor: Colors.black,
                            padding: EdgeInsets.all(10.0),
                            disabledBackgroundColor: Colors.yellow[100]
                        ),
                        child: Text('Your Ingredients List',
                            style: TextStyle(fontSize: 18, color: Colors.black)),
                      ),

                      Expanded(
                        child: ListView.builder(
                          itemCount: userRecipes.length,
                          itemBuilder: (context, index) {
                            final recipe= userRecipes[index];
                            final recipeName = recipe['Name'];
                            //final ingredients = defIng[index];
                            //final ingredients= userIng[index];
                            //final recipeIng= userIng[index];
                            // Check if the task matches the search query (only if searchText is not empty)
                            if (!uniqueRecipeNames.contains(recipeName)) {
                              uniqueRecipeNames.add(recipeName);
                              return Container(
                                decoration: BoxDecoration(
                                    color: Colors.white.withOpacity(0.98),
                                    borderRadius: BorderRadius.circular(10.0),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withOpacity(0.15),
                                        spreadRadius: 2,
                                        blurRadius: 2,
                                        offset: Offset(
                                            0, 5), // changes position of shadow
                                      ),
                                    ]
                                ),
                                margin: EdgeInsets.all(8.0),
                                child: ListTile(
                                  title: Text(recipe['Name']),
                                  subtitle: Row(
                                    children: [
                                      if(recipe['Name'] == 'Lasagna' ) Text('Pasta, Sauce, Cheese'),
                                      if(recipe['Name'] == 'Pizza' ) Text('Cheese, Dough, Tomato Sauce'),
                                      if(recipe['Name'] == 'Apple Pie' ) Text('Puff Pastry, Apples, Sugar'),
                                    ],
                                  ),


                                  /*onTap: () {
                                    _showEditTaskDialog(
                                        username, task['_id'], task['Desc'],
                                        task['Ingredient']);
                                    setState(() {});
                                  },*/

                                  trailing: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Icon(Icons.check_box),
                                      SizedBox(width: 8),
                                      // Add some space between the icon and additional text
                                      if(recipe['Name'] == 'Lasagna' ) Text(
                                          '$pastaCounter'),
                                      if(recipe['Name'] == 'Pizza' ) Text(
                                          '$pizzaCounter'),
                                      if(recipe['Name'] == 'Apple Pie' ) Text(
                                          '$pieCounter'),
                                    ],
                                  ),
                                  onTap: () {
                                    // Handle item 1 click
                                    onRedeemRecipePressed('Lasagna');
                                  },

                                ),
                              );
                            } else {
                              return Container();
                            }
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Future<void> onRedeemRecipePressed(String recipeName) async {
    try {
      // Make the API call to delete the task
      await redeemRecipes(recipeName);

      // Fetch the updated user tasks
      await fetchUserRecipes();

      // Trigger a rebuild of the widget tree
      setState(() {});
    } catch (error) {
      print("Error deleting task: $error");
      // Handle the error as needed
    }
  }

  void _showRecipeMenu(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return RecipeMenuDialog();
      },
    );
  }

  void _showIngredients(BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return IngredientsDialog(userIngredients: userIngredients);
      },
    );
  }


}

class CustomPopupMenu extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(Icons.more_vert, color: Colors.white),
      onPressed: () {
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return CustomMenuDialog();
          },
        );
      },
    );
  }
}

class CustomMenuDialog extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      backgroundColor: Colors.white,
      child: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: Text('Sign In'),
              onTap: () {
                // Handle item 1 click
                Navigator.pushNamed(context, '/login');
              },
            ),
            ListTile(
              title: Text('Sign Up'),
              onTap: () {
                // Handle item 2 click
                Navigator.pushNamed(context, '/register');
              },
            ),

            ListTile(
              title: Text('About Us'),
              onTap: () {
                // Handle item 2 click
                Navigator.pushNamed(context, '/about');
              },
            ),

            ListTile(
              title: Text('View Tasks'),
              onTap: () {
                // Handle item 2 click
                Navigator.pushNamed(context, '/main');
              },
            ),
            // Add more list items as needed
          ],
        ),
      ),
    );
  }
}


class RecipeMenuDialog extends StatelessWidget {
  _RecipeScreenState newInstance= _RecipeScreenState();

  int pastaCounter= 0;
  int pieCounter= 0;
  int pizzaCounter= 0;

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      backgroundColor: Colors.white,
      child: Container(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              title: Text('Lasagna'),
              subtitle: Text('Pasta, Sauce, Cheese'),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.check_box),
                  //SizedBox(width: 8), // Add some space between the icon and additional text
                  //Text('$pastaCounter'),
                ],
              ),
              onTap: () {
                // Handle item 1 click
                newInstance.onRedeemRecipePressed('Lasagna');
                //pastaCounter++;
              },
            ),
            ListTile(
              title: Text('Apple Pie'),
              subtitle: Text('Puff Pastry, Apples, Sugar'),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.check_box),
                  //SizedBox(width: 8), // Add some space between the icon and additional text
                  //Text('$pieCounter'),
                ],
              ),
              onTap: () {
                // Handle item 2 click
                newInstance.onRedeemRecipePressed('Apple Pie');
                //pieCounter++;
              },
            ),

            ListTile(
              title: Text('Pizza'),
              subtitle: Text('Cheese, Dough, Tomato Sauce'),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.check_box),
                  //SizedBox(width: 8), // Add some space between the icon and additional text
                  //Text('$pizzaCounter'),
                ],
              ),
              onTap: () {
                // Handle item 2 click
                newInstance.onRedeemRecipePressed('Pizza');
                //pizzaCounter++;
              },
            ),

            // Add more list items as needed
          ],
        ),
      ),
    );
  }
}

class IngredientsDialog extends StatelessWidget {
  //_RecipeScreenState newInstance= _RecipeScreenState();

  final List<Map<String, dynamic>> userIngredients;

  IngredientsDialog({required this.userIngredients});

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      backgroundColor: Colors.transparent,
      child: Center(
        child: ListView.builder(
          itemCount: userIngredients.length,
          itemBuilder: (context, index) {
            final ingredient= userIngredients[index];
            //final ingredients = defIng[index];
            //final ingredients= userIng[index];
            //final recipeIng= userIng[index];
            // Check if the task matches the search query (only if searchText is not empty)
            return Container(
              padding: EdgeInsets.all(4.0),
              decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.9),
                  borderRadius: BorderRadius.circular(10.0),
                  /*boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.15),
                      spreadRadius: 2,
                      blurRadius: 2,
                      offset: Offset(0, 5), // changes position of shadow
                    ),
                  ]*/
              ),
              margin: EdgeInsets.all(8.0),
              child: Column(
                children: [
                  ListTile(
                    title: Text(ingredient['Ingredient']),
                //subtitle: Text(userIng),
              ),
          ],
              ),
            );
          },
        ),

      ),
    );
  }
}

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}
class _MainPageState extends State<MainPage> {
  @override
  void initState() {
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}



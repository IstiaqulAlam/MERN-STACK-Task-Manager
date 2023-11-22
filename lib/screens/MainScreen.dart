import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_app/utils/getAPI.dart';
import 'package:flutter_app/screens/LoginScreen.dart';
import 'dart:convert';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}
class _MainScreenState extends State<MainScreen> {
  String message = "",
      newMessageText = '';
  String username = GlobalData.loginName;
  String desc = '', ingredient = '';
  List<Map<String, dynamic>> userTasks = [];
  List<Map<String, dynamic>> originalUserTasks = [];
  String searchText = '';
  FocusNode searchFocusNode = FocusNode();



  List<Task> tasks = [
    Task('Task 1', 'Description for Task 1',),
    Task('Task 2', 'Description for Task 2',),
    // Add more tasks as needed
  ];

  @override
  void initState() {
    super.initState();
    fetchUserTasks();
    originalUserTasks = List<Map<String, dynamic>>.from(userTasks);
    searchFocusNode.addListener(() {
      if (!searchFocusNode.hasFocus) {
        setState(() {
          searchText = '';
        });
      }
    });
  }

  Future<void> fetchUserTasks() async {
    String ret = "";
    try {
      final response= await http.get(
        Uri.parse('http://cop4331group2.com:5000/api/getUserTasks/${username}')
      );

      if (response.statusCode == 200) {
        print("entered if status= 200");
        final List<dynamic> jsonResponse = json.decode(response.body);
        print("got past list");
        print(List);
        //ret= json.decode(response.body);
        setState(() {
          userTasks = List<Map<String, dynamic>>.from(jsonResponse);
          originalUserTasks = List<Map<String, dynamic>>.from(userTasks);
        });
        print(userTasks);
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

  Future<void> editTask(String taskId, String newDesc, String newIngredient) async {
    try {
      String url = 'http://cop4331group2.com:5000/api/editTask/$taskId';
      String payload = jsonEncode({
        'desc': newDesc,
        'ingredient': newIngredient,
      });

      final response = await http.put(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: payload,
      );

      if (response.statusCode == 200) {
        // Task edited successfully
        print('Task edited successfully');
        // You might want to update your local state or refresh the task list
      } else {
        // Handle errors here
        print('Failed to edit task: ${response.statusCode}');
      }
    } catch (e) {
      print('Error during task editing: $e');
    }
  }

  Future<void> deleteTask(String username, String taskId) async {
    try {
      final response = await http.delete(
        Uri.parse('http://cop4331group2.com:5000/api/deleteTask/$username/$taskId'),
      );

      if (response.statusCode == 200) {
        // Successful deletion
        print('Task deleted successfully');
        // You might want to update your local state or refresh the task list
      } else {
        // Handle errors here
        print('Failed to delete task: ${response.statusCode}');
      }
    } catch (e) {
      print('Error during task deletion: $e');
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
                bottom: BorderSide(
                    color: Colors.grey.withOpacity(0.2), width: 1.0),
              ),
              leading:
              IconButton(
                icon: Image.asset('assets/VeggieTasksIcon.png'),
                onPressed: () {
                  Navigator.pushNamed(context, '/home');
                },
              ),
              actions: [
                Positioned(
                  top: 16.0,
                  right: 16.0,
                  child: CustomPopupMenu(), // Use the CustomPopupMenu widget
                ),
              ]
          ),
          body: Center(
            child: Align(
              alignment: Alignment.topCenter,
              child: Padding(
                padding: EdgeInsets.only(top: 100.0),
                child: Column(
                  //mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    GestureDetector(
                      onTap: () {
                        FocusScope.of(context).requestFocus(searchFocusNode);
                      },
                      child: TextField(
                        focusNode: searchFocusNode,
                        onChanged: (value) {
                          setState(() {
                            searchText = value;
                          });
                        },
                        decoration: InputDecoration(
                          labelText: 'Search Tasks',
                          prefixIcon: Icon(Icons.search),
                        ),
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () async
                      {
                        _showAddTaskDialog();

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
                      child: Text('Create A Task!',
                          style: TextStyle(fontSize: 18, color: Colors.black)),
                    ),

                    /*ElevatedButton(
                      onPressed: () async
                      {
                        Navigator.pushNamed(context, '/register');
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
                      child: Text('View Recipies',
                          style: TextStyle(fontSize: 18, color: Colors.black)),
                    ),*/


                    /*ElevatedButton(
                      onPressed: () async
                      {
                        Navigator.pushNamed(context, '/register');
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
                      child: Text('Your Ingredients',
                          style: TextStyle(fontSize: 18, color: Colors.black)),
                    ),*/

                    Expanded(
                      child: ListView.builder(
                        itemCount: userTasks.length,
                        itemBuilder: (context, index) {
                          print("Length of originalUserTasks: ${originalUserTasks.length}");
                          final task= originalUserTasks[index];
                          // Check if the task matches the search query (only if searchText is not empty)
                          if (searchText.isEmpty || task['Desc'].toLowerCase().contains(searchText.toLowerCase())) {
                            return Container(
                              decoration: BoxDecoration(
                                  color: Colors.lightBlue.withOpacity(0.7),
                                  borderRadius: BorderRadius.circular(10.0)
                              ),
                              margin: EdgeInsets.all(8.0),
                              child: ListTile(
                                title: Text(task['Desc']),
                                subtitle: Text('${task['Ingredient']}'),
                                onTap: () {
                                  _showEditTaskDialog(
                                      username, task['_id'], task['Desc'],
                                      task['Ingredient']);
                                  setState(() {});
                                },
                                trailing: IconButton(
                                  icon: Icon(Icons.delete),
                                  onPressed: () {
                                    // Call the deleteTask function when the delete button is pressed
                                    onDeleteTaskPressed(username, task['_id']);
                                  },
                                ),
                              ),
                            );
                          } else{
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


      ],
    );
  }

  changeText() {
    setState(() {
      message = newMessageText;
    });
  }

  Future<void> onDeleteTaskPressed(String username, String taskId) async {
    try {
      // Make the API call to delete the task
      await deleteTask(username, taskId);

      // Fetch the updated user tasks
      await fetchUserTasks();

      // Trigger a rebuild of the widget tree
      setState(() {});
    } catch (error) {
      print("Error deleting task: $error");
      // Handle the error as needed
    }
  }


  // Function to show a dialog for adding a new task
  Future<void> _showAddTaskDialog() async {
    TextEditingController titleController = TextEditingController();
    TextEditingController descriptionController = TextEditingController();
    TextEditingController ingredientController = TextEditingController();

    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Add New Task'),
          content: Column(
            children: [
              TextField(
                controller: descriptionController,
                decoration: InputDecoration(labelText: 'Task/Description'),
                onChanged: (text) {
                  desc = text;
                },
              ),
              TextField(
                controller: ingredientController,
                decoration: InputDecoration(labelText: 'Details/Ingredients'),
                onChanged: (text) {
                  ingredient = text;
                },
              ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Add Task'),
              onPressed: ()   async  {
                // Validate and add the new task
                if (descriptionController.text.isNotEmpty) {
                  Task newTask = Task(
                    descriptionController.text,
                    ingredientController.text,
                  );

                  newMessageText = "";
                  changeText();
                  String payload = '{"username":"${username.trim()}","desc":"${desc.trim()}","ingredient":"'
                      '${ingredient.trim()}"}';

                  try {
                    String url = 'http://cop4331group2.com:5000/api/createTask';
                    await CardsData.postJson(url, payload);
                    await fetchUserTasks(); // Refresh tasks after adding a new one
                  }
                  catch (e) {
                    print("Error in login request: $e");
                    newMessageText = "error message";
                    changeText();
                    return;
                  }
                }
                Navigator.of(context).pop();
                setState(() {});
              },

            ),

          ],




        );
      },
    );
  }

  Future<void> _showEditTaskDialog(String username, String taskId, String currentDesc, String currentIngredient) async {
    TextEditingController descriptionController = TextEditingController(text: currentDesc);
    TextEditingController ingredientController = TextEditingController(text: currentIngredient);

    await showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Edit Task'),
          content: Column(
            children: [
              TextField(
                controller: descriptionController,
                decoration: InputDecoration(labelText: 'Task/Description'),
              ),
              TextField(
                controller: ingredientController,
                decoration: InputDecoration(labelText: 'Details/Ingredients'),
              ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: Text('Save Changes'),
              onPressed: () async {
                await editTask(taskId, descriptionController.text, ingredientController.text);
                Navigator.of(context).pop();
                setState(() {});
              },
            ),
          ],
        );
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
            // Add more list items as needed
          ],
        ),
      ),
    );
  }
}

class Task{
  final String description;
  final String ingredient;

  Task(this.description, this.ingredient);
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

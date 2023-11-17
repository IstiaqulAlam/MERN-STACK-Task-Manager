import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}
class _MainScreenState extends State<MainScreen> {
  String message = "",
      newMessageText = '';
  String loginName = '',
      password = '';

  List<Task> tasks = [
    Task('Task 1', 'Description for Task 1'),
    Task('Task 2', 'Description for Task 2'),
    // Add more tasks as needed
  ];

  @override
  void initState() {
    super.initState();
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
                PopupMenuButton<String>(
                  icon: const Icon(Icons.menu),
                  onSelected: (value) {
                    Navigator.pushNamed(context, '/' "$value");
                    //print('Selected: $value');
                  },
                  itemBuilder: (BuildContext context) {
                    return [
                      const PopupMenuItem<String>(
                        value: 'login',
                        child: Text('Sign In'),
                      ),
                      const PopupMenuItem<String>(
                        value: 'register',
                        child: Text('Sign Up'),
                      ),
                      const PopupMenuItem<String>(
                        value: 'about',
                        child: Text('About'),
                      ),
                    ];
                  },
                )
              ]
          ),
          body: Center(
            child: Align(
              alignment: Alignment.topCenter,
              child: Padding(
                padding: EdgeInsets.only(top: 150.0),
                child: Column(
                  //mainAxisAlignment: MainAxisAlignment.center,
                  children: [
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
                        itemCount: tasks.length,
                        itemBuilder: (context, index) {
                          return Container(
                            decoration: BoxDecoration(
                              color: Colors.lightBlue.withOpacity(0.7),
                                borderRadius: BorderRadius.circular(10.0)
                            ),
                            margin: EdgeInsets.all(8.0),
                            child:
                            ListTile(
                            title: Text(tasks[index].title),
                            subtitle: Text(tasks[index].description),
                          ),
                          );
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

  // Function to show a dialog for adding a new task
  Future<void> _showAddTaskDialog() async {
    TextEditingController titleController = TextEditingController();
    TextEditingController descriptionController = TextEditingController();

    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Add New Task'),
          content: Column(
            children: [
              TextField(
                controller: titleController,
                decoration: InputDecoration(labelText: 'Title'),
              ),
              TextField(
                controller: descriptionController,
                decoration: InputDecoration(labelText: 'Description'),
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
              onPressed: () {
                // Validate and add the new task
                if (titleController.text.isNotEmpty) {
                  Task newTask = Task(
                    titleController.text,
                    descriptionController.text,
                  );
                  setState(() {
                    tasks.add(newTask);
                  }); // Trigger a rebuild
                }
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}

class Task{
  final String title;
  final String description;

  Task(this.title, this.description);
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

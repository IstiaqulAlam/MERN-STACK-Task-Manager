import 'package:flutter/material.dart';
import 'dart:io';
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';
import 'package:path/path.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}
class _HomeScreenState extends State<HomeScreen> {
  String message = "This is a message",
      newMessageText = '';
  String loginName = '',
      password = '';

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
          PopupMenuButton<String>(
              icon: const Icon(Icons.menu),
              onSelected: (value) {
                Navigator.pushNamed(context, '/' "$value");
                //print('Selected: $value');
              },
            itemBuilder: (BuildContext context){
                return[
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
    ),
          Center(
            child: Align(
              alignment: Alignment.topCenter,
              child: Padding(
                padding: EdgeInsets.only(top: 200.0),
                child: Column(
                  //mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  DefaultTextStyle(
                  child: Text('Make Life'),
                  style: TextStyle(
                  color: Colors.white,
                  fontSize: 44.0,
                  fontWeight: FontWeight.bold,
                  ),
                  ),
                  const SizedBox(height: 10.0),
                  DefaultTextStyle(
                    child: Text('A Game'),
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 44.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 80.0),
                  ElevatedButton(
                    onPressed: () async
                    {
                      Navigator.pushNamed(context, '/register');
                    },
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20.0)
                      ),
                        backgroundColor:Colors.yellow[100],
                        foregroundColor: Colors.black,
                        padding: EdgeInsets.all(20.0),
                        disabledBackgroundColor: Colors.yellow[100]
                    ),
                    child: Text('Level Up!',style: TextStyle(fontSize: 18 ,color:Colors.black)),
                  ),
                  SizedBox(height: 70.0),
                  Image.asset('assets/VeggieTasksChest1.png'),

                ],
                ),
              ),
          ),

        ),
    ],
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


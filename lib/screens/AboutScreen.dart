import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';

class AboutScreen extends StatefulWidget {
  @override
  _AboutScreenState createState() => _AboutScreenState();
}
class _AboutScreenState extends State<AboutScreen> {
  String message = "", newMessageText = '';
  String loginName = '', password = '';

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
                      value: 'home',
                      child: Text('Home'),
                    ),
                    const PopupMenuItem<String>(
                      value: 'register',
                      child: Text('Sign Up'),
                    ),
                    const PopupMenuItem<String>(
                      value: 'login',
                      child: Text('Sign In'),
                    ),
                  ];
                },
              ),
            ],
          ),

          body: Center(
            child: Container(
              height: 400,
              width: 350,
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10.0)
              ),

              child: Align(
                alignment: Alignment.topCenter,
                child: Padding(
                  padding: EdgeInsets.only(top: 50.0),
                  child: Column(
                    //mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
                    //crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Text(
                            "About Us",
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 34.0,
                              fontWeight: FontWeight.normal,
                            ),
                          ),
                        ],
                      ),
                      SizedBox(height: 40.0),
                      Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              width: 300,
                              child:
                              Text(
                              'Axel Maysonet: Mobile App Frontend\nJoseph Allen Finfrock: Project Manager\nIstiaqul Alam: Frontend\nMonica Castro-Suarez: API\nAllen Lin: Database\nMarieclaire Guzman Reyes: API\nDawn Martin	Webapp: Frontend',
                                    style: TextStyle(
                                      fontSize: 17,
                                      fontStyle: FontStyle.italic,
                                      height: 1.5,
                                    ),
                                ),
                            ),
                          ]
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



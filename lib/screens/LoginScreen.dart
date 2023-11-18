import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}
class _LoginScreenState extends State<LoginScreen> {
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
              value: 'about',
              child: Text('About'),
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
              padding: EdgeInsets.only(top: 60.0),
            child: Column(
          //mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
          //crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
          children: [
              Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  "Login",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 34.0,
                    fontWeight: FontWeight.normal,
                  ),
                ),
                      ],
            ),
            SizedBox(height: 15.0),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: 300,
                    height: 70,
                    child:
                    TextField (
                      decoration: InputDecoration(
                          filled: true,
                          fillColor: Colors.white,
                          border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(40.0)
                          ),
                          labelText: 'Username',
                          hintText: 'Enter Your Login Name'
                      ),
                      onChanged: (text) {
                        loginName = text;
                      },
                    ),
                  ),
                ]
            ),
            SizedBox(height: 10.0),
            Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Container(
                    width: 300,
                    height: 70,
                    child:
                    TextField (
                      obscureText: true,
                      decoration: InputDecoration(
                          filled: true,
                          fillColor: Colors.white,
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(40.0)
                          ),
                          labelText: 'Password',
                          hintText: 'Enter Your Password'
                      ),
                      onChanged: (text) {
                        password = text;
                      },
                    ),
                  ),
                ]
            ),

            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text('$message',style: TextStyle(fontSize: 14 ,color:Colors.black)),
              ],
            ),

            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                ElevatedButton(
                  onPressed: () async
                  {
                    newMessageText = "";
                    changeText();
                    String payload = '{"username":"' + loginName.trim() + '","password":"' + password.trim() + '"}';
                    String? userId = "";
                    List<dynamic> labels;
                    var jsonObject;

                    try
                    {
                      String url = 'http://cop4331group2.com:5000/api/login';

                      String ret = await CardsData.getJson(url, payload);
                      Map<String, dynamic> jsonObject = json.decode(ret);
                      labels= jsonObject["msg"];
                      for(var label in labels) {
                        userId = label["_id"];
                      }

                    }
                    catch(e)
                    {
                      print("Error in login request: $e");
                      newMessageText = "error message";
                      changeText();
                      return;
                    }
                    if( userId == null )
                    {
                      newMessageText = "Incorrect Login/Password";
                      changeText();
                    }
                    else {
                      print("else statement");
                      for(var label in labels) {
                        GlobalData.userId = userId;
                        print("did  get past userID");
                        print(label["FirstName:"]);
                        GlobalData.firstname = label["FirstName"];
                        print("did get past first name");
                        GlobalData.lastname = label["LastName"];
                        GlobalData.loginName = loginName;
                        Navigator.pushNamed(context, '/main');
                      }
                    }

                  },
                  style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10.0)
                      ),
                      backgroundColor:Colors.yellow[100],
                      foregroundColor: Colors.black,
                      padding: EdgeInsets.all(2.0),
                      disabledBackgroundColor: Colors.grey[100]
                  ),
                  child: Text('Sign In',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                )
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  "Don't Have an account?",
                  style: TextStyle(
                  color: Colors.black,
                  fontSize: 18.0,
                  fontWeight: FontWeight.normal,
                ),
                ),
                ElevatedButton(
                  onPressed: () async
                  {
                    Navigator.pushNamed(context, '/register');
                  },
                  style: ElevatedButton.styleFrom(
                      backgroundColor:Colors.transparent,
                      elevation: 0,
                      //foregroundColor: Colors.black,
                      padding: EdgeInsets.all(2.0),
                      //disabledBackgroundColor: Colors.grey[100]
                  ),
                  child: Text('Sign Up',style: TextStyle(fontSize: 18 ,color:Colors.blueAccent)),
                )
              ],
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

  changeText() {
    setState(() {
      message = newMessageText;
    });
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



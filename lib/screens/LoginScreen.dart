import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}
class _LoginScreenState extends State<LoginScreen> {
  String message = "This is a message", newMessageText = '';
  String loginName = '', password = '';

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue,
    body: Container(
        width: 200,
        child:
        Column(
          mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
          crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
          children: <Widget>[
        Row(
        children: <Widget>[
          Container(
          width: 200,
          child:
          TextField (
            decoration: InputDecoration(
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(),
                labelText: 'Login Name',
                hintText: 'Enter Your Login Name'
            ),
              onChanged: (text) {
                loginName = text;
              },
          ),
        ),
        ]
    ),
    Row(
      children: <Widget>[
      Container(
        width: 200,
        child:
        TextField (
          obscureText: true,
          decoration: InputDecoration(
          filled: true,
          fillColor: Colors.white,
          border: OutlineInputBorder(),
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
              children: <Widget>[
                Text('$message',style: TextStyle(fontSize: 14 ,color:Colors.black)),
              ],
            ),

    Row(
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
                Navigator.pushNamed(context, '/cards');
              }
            }

          },
          style: ElevatedButton.styleFrom(
              backgroundColor:Colors.brown[50],
              foregroundColor: Colors.black,
              padding: EdgeInsets.all(2.0),
              disabledBackgroundColor: Colors.grey[100]
          ),
          child: Text('Login',style: TextStyle(fontSize: 14 ,color:Colors.black)),
        )
    ],
    ),
        Row(
            children: <Widget>[
            ElevatedButton(
            onPressed: () async
        {
        Navigator.pushNamed(context, '/register');
        },
              style: ElevatedButton.styleFrom(
                  backgroundColor:Colors.brown[50],
                  foregroundColor: Colors.black,
                  padding: EdgeInsets.all(2.0),
                  disabledBackgroundColor: Colors.grey[100]
              ),
              child: Text('Go Register',style: TextStyle(fontSize: 14 ,color:Colors.black)),
            )
            ],
        )
    ],
    )
    )
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



import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}
class _RegisterScreenState extends State<RegisterScreen> {
  String message = "Welcome!", newMessageText = '';
  String loginName = '', password = '', passwordRepeat = '', email = '';
  String firstname= '', lastname= '';

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
                              labelText: 'First Name',
                              hintText: 'Enter Your First Name'
                          ),
                          onChanged: (text) {
                            firstname = text;
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
                          decoration: InputDecoration(
                              filled: true,
                              fillColor: Colors.white,
                              border: OutlineInputBorder(),
                              labelText: 'Last Name',
                              hintText: 'Enter Your Last Name'
                          ),
                          onChanged: (text) {
                            lastname = text;
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
                          decoration: InputDecoration(
                              filled: true,
                              fillColor: Colors.white,
                              border: OutlineInputBorder(),
                              labelText: 'Username',
                              hintText: 'Enter Your Username'
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
                      Container(
                        width: 200,
                        child:
                        TextField (
                          obscureText: true,
                          decoration: InputDecoration(
                              filled: true,
                              fillColor: Colors.white,
                              border: OutlineInputBorder(),
                              labelText: 'ReType Password',
                              hintText: 'Enter Your Password Again'
                          ),
                          onChanged: (text) {
                            passwordRepeat = text;
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
                              labelText: 'Email',
                              hintText: 'Enter Your Email'
                          ),
                          onChanged: (text) {
                            email = text;
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
                        String payload = '{"firstname":"${firstname.trim()}","lastname":"${lastname.trim()}","username":"'
                            '${loginName.trim()}","password":"${password.trim()}","email":"${email.trim()}"}';
                        String? userId = "";
                        if(password == passwordRepeat) {
                          try {
                            String url = 'http://cop4331group2.com:5000/api/register';
                            print("payload is probably the problem");
                            String ret = await CardsData.postJson(url, payload);
                            print("payload was not the problem");
                            print(payload);
                            print(ret);

                            Map<String, dynamic> jsonObject = json.decode(ret);



                          }
                          catch (e) {
                            print("Error in login request: $e");
                            newMessageText = "error message";
                            changeText();
                            return;
                          }
                        }
                        else{
                          newMessageText= "passwords dont match";
                        }
                        Navigator.pushNamed(context, '/login');
                      },
                      style: ElevatedButton.styleFrom(
                          backgroundColor:Colors.brown[50],
                          foregroundColor: Colors.black,
                          padding: EdgeInsets.all(2.0),
                          disabledBackgroundColor: Colors.grey[100]
                      ),
                      child: Text('Register',style: TextStyle(fontSize: 14 ,color:Colors.black)),
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
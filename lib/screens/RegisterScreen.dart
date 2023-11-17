import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}
class _RegisterScreenState extends State<RegisterScreen> {
  String message = "", newMessageText = '';
  String loginName = '', password = '', passwordRepeat = '', email = '';
  String firstname= '', lastname= '';

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
              value: 'login',
              child: Text('Sign In'),
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
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
            child: SingleChildScrollView(
            child: Container(
            width: 350,
            decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(10.0)
            ),
            child: Align(
            alignment: Alignment.topCenter,
            child: Padding(
            padding: EdgeInsets.only(top: 40.0),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text(
                      "Sign Up",
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
                    children: <Widget>[
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
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
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
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
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
                  mainAxisAlignment: MainAxisAlignment.center,
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
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10.0)
                          ),
                          backgroundColor:Colors.yellow[100],
                          foregroundColor: Colors.black,
                          padding: EdgeInsets.all(2.0),
                          disabledBackgroundColor: Colors.grey[100]
                      ),
                      child: Text('Register',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                    ),
                  ],
                ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
              Text(
                "Have an account?",
                style: TextStyle(
                color: Colors.black,
                fontSize: 18.0,
                fontWeight: FontWeight.normal,
                        ),
              ),
              ElevatedButton(
                onPressed: () async
                  {
                    Navigator.pushNamed(context, '/login');
                  },
                style: ElevatedButton.styleFrom(
                backgroundColor:Colors.transparent,
                elevation: 0,
                //foregroundColor: Colors.black,
                padding: EdgeInsets.all(2.0),
                //disabledBackgroundColor: Colors.grey[100]
                ),
              child: Text('Sign In',style: TextStyle(fontSize: 18 ,color:Colors.blueAccent)),
              ),
                  ],
          )

              ],
            ),
        ),
    ),
    ),
    ),
      ),
    ],
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
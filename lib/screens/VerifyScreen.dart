import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class VerifyScreen extends StatefulWidget {
  @override
  _VerifyScreenState createState() => _VerifyScreenState();
}
class _VerifyScreenState extends State<VerifyScreen> {
  String message = "", newMessageText = '';
  String loginName = '', password = '';
  TextEditingController verificationCodeController = TextEditingController();

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
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextField(
                  controller: verificationCodeController,
                  decoration: InputDecoration(
                  labelText: 'Verification Code',
                  ),
                  ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    verifyEmail();
                    Navigator.pushNamed(context, '/login');
                  },
                  child: Text('Verify'),
                ),
                SizedBox(height: 10),
                Text(message),
              ],
                ),
              ),
        ),
        ),
      ],
    );
  }

  Future<void> verifyEmail() async {
    try {
      String verificationCode = verificationCodeController.text;
      String url = 'http://cop4331group2.com:5000/api/verify';

      final response = await http.post(
        Uri.parse(url),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'verificationCode': verificationCode}),
      );

      if (response.statusCode == 200) {
        Map<String, dynamic> result = json.decode(response.body);
        if (result['success']) {
          setState(() {
            message = 'Email verified successfully!';
          });
          // Perform navigation to the next screen or take necessary actions
        } else {
          setState(() {
            message = 'Verification failed. Please check your code.';
          });
        }
      } else {
        setState(() {
          message = 'Error verifying email. Please try again.';
        });
      }
    } catch (error) {
      setState(() {
        message = 'Error: $error';
      });
    }
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



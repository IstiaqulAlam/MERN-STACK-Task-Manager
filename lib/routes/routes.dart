import 'package:flutter/material.dart';
import 'package:flutter_app/screens/LoginScreen.dart';
import 'package:flutter_app/screens/CardsScreen.dart';
import 'package:flutter_app/screens/RegisterScreen.dart';
import 'package:flutter_app/screens/HomeScreen.dart';
import 'package:flutter_app/screens/MainScreen.dart';
import 'package:flutter_app/screens/AboutScreen.dart';

class Routes {
  static const String LOGINSCREEN = '/login';
  static const String CARDSSCREEN = '/cards';
  static const String REGISTERSCREEN = '/register';
  static const String HOMESCREEN = '/home';
  static const String MAINSCREEN = '/main';
  static const String ABOUTSCREEN = '/about';
// routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
    '/': (context) => HomeScreen(),
    LOGINSCREEN: (context) => LoginScreen(),
    CARDSSCREEN: (context) => CardsScreen(),
    REGISTERSCREEN: (context) => RegisterScreen(),
    HOMESCREEN: (context) => HomeScreen(),
    MAINSCREEN: (context) => MainScreen(),
    ABOUTSCREEN: (context) => AboutScreen(),
  };
}
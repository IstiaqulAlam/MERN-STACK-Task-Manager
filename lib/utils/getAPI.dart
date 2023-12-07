import 'package:http/http.dart' as http;
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';

class GlobalData
{
  static String? userId='';
  static String firstname='';
  static String lastname='';
  static String loginName='';
  static String password='';
}

class CardsData {
  static Future<String> getJson(String url, String outgoing) async
  {
    String ret = "";
    try
    {
      Uri uri = Uri.parse(url);

      http.Response response = await http.post(uri,
          body: utf8.encode(outgoing),
          headers:
          {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          encoding: Encoding.getByName("utf-8")
      );
      ret = response.body;
    }
    catch (e)
    {
      print(e.toString());
    }
    return ret;
  }

  static Future<String> postJson(String url, String outgoing) async{
    {
      String ret = "";
      try
      {
        Uri uri = Uri.parse(url);

        http.Response response = await http.post(uri,
            body: utf8.encode(outgoing),
            headers:
            {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            encoding: Encoding.getByName("utf-8")
        );
        if(response.statusCode == 200) {
          ret = response.body;
        }
        else{
          print("api error:");
          print(response.statusCode);
          ret= "Registration failed";
        }
      }
      catch (e)
      {
        print(e.toString());
        ret= "Error Occured";
      }
      return ret;
    }
  }

}
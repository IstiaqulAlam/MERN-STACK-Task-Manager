import 'package:flutter/material.dart';
import 'package:flutter_app/utils/getAPI.dart';
import 'dart:convert';
class CardsScreen extends StatefulWidget {
  @override
  _CardsScreenState createState() => _CardsScreenState();
}
class _CardsScreenState extends State<CardsScreen> {
  String message = "This is a message", newMessageText = '';
  String addMessage = '', newAddMessage = '';
  String searchMessage = '', newSearchMessage = '';
  String search= '', card= '';

  @override
  void initState() {
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.blue,
    body: Container(
        width: 400,
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
                          labelText: 'Search',
                          hintText: 'Search for a Card'
                      ),
                    ),
                  ),
                  ElevatedButton(
                    onPressed: ()
                    {
                    },
                    style: ElevatedButton.styleFrom(
                        backgroundColor:Colors.brown[50],
                        foregroundColor: Colors.black,
                        padding: EdgeInsets.all(2.0),
                        disabledBackgroundColor: Colors.grey[100]
                    ),
                    child: Text('Search',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                  )
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
                          labelText: 'Add',
                          hintText: 'Add a Card'
                      ),
                    ),
                  ),
                  ElevatedButton(
                    onPressed: ()
                    {
                    },
                    style: ElevatedButton.styleFrom(
                        backgroundColor:Colors.brown[50],
                        foregroundColor: Colors.black,
                        padding: EdgeInsets.all(2.0),
                        disabledBackgroundColor: Colors.grey[100]
                    ),
                    child: Text('Add',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                  )
                ]
            ),
            Row(
              children: <Widget>[
                ElevatedButton(
                  onPressed: ()
                  {
                    Navigator.pushNamed(context, '/login');
                  },
                  style: ElevatedButton.styleFrom(
                      backgroundColor:Colors.brown[50],
                      foregroundColor: Colors.black,
                      padding: EdgeInsets.all(2.0),
                      disabledBackgroundColor: Colors.grey[100]
                  ),
                  child: Text('Logout',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                )
              ],
            ),

            Row(
              children: <Widget>[
                Text('$message',style: TextStyle(fontSize: 14 ,color:Colors.black)),
              ],
            ),

          Row(
            children: <Widget>[
              Column(
                children: <Widget>[
                  Container(
                    width: 200,
                    child:
                    TextField (
                    decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Search',
                    hintText: 'Search for a Card'
                    ),
                      onChanged: (text)
                      {
                        search = text;
                      },
                    ),

                 ),
              Row(
                children: <Widget>[
                Text('$searchMessage',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                          ],
                  ),
                ]
              ),
          ElevatedButton(
            child: Text('Search',style: TextStyle(fontSize: 14 ,color:Colors.black)),
              onPressed: () async
              {
                newSearchMessage = "";
                changeSearchText();
                String payload = '{"userId":"' + GlobalData.userId.toString() + '","search":"' + search.trim() + '"}';
                var jsonObject;
                try
                {
                  String url = 'https://cop4331-10.herokuapp.com/api/searchcards';
                  String ret = await CardsData.getJson(url, payload);
                  jsonObject = json.decode(ret);
                }
                catch(e)
                {
                  newSearchMessage = "e.message";
                  changeSearchText();
                  return;
                }
                var results = jsonObject["results"];
                var i = 0;
                while( true )
                {
                  try
                  {
                    newSearchMessage += results[i];
                    newSearchMessage += "\n";
                    i++;
                  }
                  catch(e)
                  {
                    break;
                  }
                }
                changeSearchText();
              },
              style: ElevatedButton.styleFrom(
                  backgroundColor:Colors.brown[50],
                  foregroundColor: Colors.black,
                  padding: EdgeInsets.all(2.0),
                  disabledBackgroundColor: Colors.grey[100]
              )
          )
                          ]
            ),
        Row(
          children: <Widget>[
          Column(
            children: <Widget>[
            Container(
              width: 200,
              child:
            TextField (),
            )]
            ),
        ElevatedButton(
          child: Text('Search',style: TextStyle(fontSize: 14 ,color:Colors.black)),
          onPressed: ()
          {
          },
            style: ElevatedButton.styleFrom(
                backgroundColor:Colors.brown[50],
                foregroundColor: Colors.black,
                padding: EdgeInsets.all(2.0),
                disabledBackgroundColor: Colors.grey[100]
            )
        )
                        ]
            ),
          Row(
            children: <Widget>[
            Column(
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
                  labelText: 'Add',
                  hintText: 'Add a Card'
                  ),
                  onChanged: (text)
                  {
                    card = text;
                  },

                ),
              ),
            Row(
              children: <Widget>[
              Text('$addMessage',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                        ],
              ),
                        ],
            ),
          ElevatedButton(
            child: Text('Add',style: TextStyle(fontSize: 14 ,color:Colors.black)),
              onPressed: () async
              {
                newAddMessage = "";
                changeAddText();
                String payload = '{"userId":"' + GlobalData.userId.toString() + '","card":"' + card.trim() + '"}';
                var jsonObject;
                try
                {
                  String url = 'https://cop4331-10.herokuapp.com/api/addcard';
                  String ret = await CardsData.getJson(url, payload);
                  jsonObject = json.decode(ret);
                }
                catch(e)
                {
                  newAddMessage = "e.message";
                  changeAddText();
                  return;
                }
                newAddMessage = "Card has been added";
                changeAddText();
              },
            style: ElevatedButton.styleFrom(
              backgroundColor:Colors.brown[50],
              foregroundColor: Colors.black,
              padding: EdgeInsets.all(2.0),
              disabledBackgroundColor: Colors.grey[100]
            )
          )
                          ]
            ),
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
    void changeAddText() {
      setState(() {
        addMessage = newAddMessage;
      });
    }
    void changeSearchText() {
      setState(() {
        searchMessage = newSearchMessage;
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



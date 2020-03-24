import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  backendUrl = 'http://localhost:3001';
  results: any= ''; 
  name: any = '';
  sessionid: any =1234556;
  urls: any ='';
  content: any='';

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.sessionid = this.sessionid+Math.random()
    const url ="http://localhost:3001/response?message=Hi&session="+this.sessionid;
    console.log('URL',url);
    this.http.get(url).
    subscribe((data) => {
      this.results = data;
      console.log(this.results);
    }, (err) => {
    this.results="No response"
    console.log(err);
    console.log('Unable to get data',err.error.text);
    var node1 = document.createElement("DIV");
    node1.setAttribute("id", "test1");
    node1.setAttribute("style","color:white;font-family:Open Sans;font-size:17px;text-align:left;line-height:30px;background-color:#4169e1;padding:10px;border-radius:2px;width:70%;margin-top:10px;margin-left:10px");
    var textnode1 = document.createTextNode(err.error.text);
    node1.appendChild(textnode1);
    document.getElementById("userInput").appendChild(node1);
    });
  }

  search(){
    const text=this.name;
    const url = `http://localhost:3001/response?message=`+this.name+"&session="+this.sessionid;
    console.log('URL',url);
    this.http.get(url).subscribe((data) => {
      this.results = data;
      console.log(this.results);
      var node = document.createElement("DIV");
      var textnode = document.createTextNode("Water");
      node.appendChild(textnode);
      document.getElementById("userInput").appendChild(node);
      var node1 = document.createElement("DIV");
      var textnode1 = document.createTextNode('Cool');
      node1.appendChild(textnode1);
      document.getElementById("userInput").appendChild(node1);
    },(err) => {
      this.results="Error"
    console.log('Unable to get data',err.error.text);
    var node = document.createElement("DIV");
    node.setAttribute("id", "test");
    node.setAttribute("style","color:white;font-family:Open Sans;font-size:17px;text-align:right;line-height:30px;width:10%;margin-top:10px;background-color:#808080;margin-right:0;margin-left:900px;padding:10px;");
    var textnode = document.createTextNode(this.name+' '+' ');
    node.appendChild(textnode);
    document.getElementById("userInput").appendChild(node);
    var node1 = document.createElement("DIV");
    node1.setAttribute("id", "test1");
    node1.setAttribute("style","color:white;font-family:Open Sans;font-size:17px;text-align:left;line-height:30px;background-color:#4169e1;padding:10px;border-radius:2px;width:70%;margin-top:10px;margin-left:10px;");
    if (err.error.text.includes("Please click")){
      var textnode1 = document.createTextNode(err.error.text);
      this.urls="https://meet.google.com/yvt-bits-obi"
      this.content="Please Join Video Conference"
    }
    else{
    var textnode1 = document.createTextNode(err.error.text);
    }
    node1.appendChild(textnode1);
    document.getElementById("userInput").appendChild(node1);
    this.name=''
    });
  }

}

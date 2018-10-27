import React, { Component } from 'react'
import './CSS/Form.css'
import axios from 'axios';



class Forms extends Component{

    constructor()
    {
        super();
        this.state = {
            //example data
            note:null,
            ipAddress:null,
            Blacklist:true,
            Whitelist:false
        }
    }

    updateAction = (e) =>{

        e.preventDefault();
        if(e.target.value =="Blacklist"){

            this.setState({Blacklist:!this.state.Blacklist});
            this.setState({Whitelist:false});

        }else{

            this.setState({Whitelist:!this.state.Whitelist});
            this.setState({Blacklist:false});

        }
          
        
       
    }

    updateWhiteList = (e) =>{

        e.preventDefault();  
        this.setState({Whitelist:!this.state.Whitelist});
        this.setState({Blacklist:false});
    }

    updateIP = (e) =>{

        e.preventDefault();
        this.setState({ipAddress:e.target.value});
        
  
    }

    

    updateNotes = (e) =>{

        e.preventDefault();
       
        this.setState({note:"# "+e.target.value});

       
    }

  

    sendPayload = (e) =>{

        e.preventDefault();

        console.log("White list val is "+this.state.Blacklist);
        console.log("black list val is "+this.state.Whitelist);


        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.state.ipAddress)) {

            //we need to get the repo

            

            if(this.state.Blacklist){
                console.log("blacklist entry found");
                axios.post('/getBlacklist', {
                
                }).then(result => {
                    console.log(result);
                    axios.post('/addToBlacklist', {
                        note:this.state.note,ipadress:this.state.ipAddress
                    }).then(result => {
                        console.log(result);
                       

                    });
        
                });
                //send black liost data to blacklist repo
                console.log(this.state.Blacklist,this.state.ipAddress,this.state.note);
    
            }else{
                console.log("whitelist entry found");
                axios.post('/getWhitelist', {
                
                }).then(result => {
                    console.log(result);
                    axios.post('/addToWhitelist', {
                        note:this.state.note,ipadress:this.state.ipAddress
                    }).then(result => {
                       console.log(result);
                       

                    });


        
                });
                //send whitelist data to whitelist repo
                console.log(this.state.Whitelist,this.state.ipAddress,this.state.note);
    
            }

        }else{

            alert("Please enter a valid IP Address");

        }
        var ip = document.getElementById("ip").value="";
        var notes = document.getElementById("notes").value="";
    }

    render(){
        return(
            <div className="container">
                <div className="subContainer"> 

            <ul>
                <li>
                <label>Action</label>
                <select onChange={this.updateAction} className="custom-select-md" >
                    <option>Blacklist</option>
                    <option>Whitelist</option>
                </select></li>
                    
                <li>
                <label>IP Address</label>
                <input type="text" onChange={this.updateIP} id="ip"></input>
                </li>
              
                <li>
                <label>Comment</label>
                <input type="text" onChange={this.updateNotes} id="notes"></input>
                </li>
                <li>
                <button onClick={this.sendPayload}>Send</button>
                </li>
                
            </ul>
        </div>
    </div>
        );
    }
}


export default Forms
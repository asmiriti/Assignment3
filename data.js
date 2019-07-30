document.getElementById('btn').addEventListener('click',loadUsers);

var array=[];





//to find the defender size aver
function defenderSize(array)
{

        let defenderData=[];
        let arr=[];
        for(let i=0;i<array.length;i++)
        {
            defenderData.push(array[i].defender_size);
        }
        
        defenderData=defenderData.filter(function(num) 
        {   
            return num!=null; 
        
        });
        
        let sum=defenderData.reduce((a,b)=>a+b,0);
        let average=sum/(array.length);
        
        
        let min=defenderData[0];
        let max=defenderData[0];

        for(let i=0;i<defenderData.length;i++)
        {
            if(defenderData[i]>max)
            max=defenderData[i];


            if(defenderData[i]<min)
            min=defenderData[i];
        }


        // console.log(defenderData);
        // console.log(Math.ceil(average));
        // console.log("maximum "+max);
        // console.log("minimum "+min);

        average=Math.ceil(average);
        arr.push(average,min,max);
        return arr;

}




//to find the type of the  battle

function battleType(array)
{

        let battle=[];

        for(let i=0;i<array.length;i++)
        {
            battle.push(array[i].battle_type);
        }

        

        let battleTypes=[...new Set(battle)];



        battleTypes=battleTypes.filter(function(num) 
        {   
            return num!=""; 
        
        });

        return battleTypes;
        //console.log(battleTypes);

}



//to find the outcome

function WinLoss(array)
{

        let win=0,loss=0;

        let arr=[];

        for(let i=0;i<array.length;i++)
        {
            if(array[i].attacker_outcome=="win")
            win++;

            else if(array[i].attacker_outcome=="loss")
            loss++;
        }
        arr.push(win,loss);

        return arr;

        //console.log("win"+win +" "+"loss"+loss);

}




//to find the most active region

function findRegion(array)
{

        //if(array[0].region.length == 0)
          //  return null;
        let regions = {};
        let maxEl = array[0].region, maxCount = 1;
        for(let i = 0; i < array.length; i++)
        {
            let el = array[i].region;
            if(regions[el] == null)
                regions[el] = 1;
            else
                regions[el]++;  
            if(regions[el] > maxCount)
            {
                maxEl = el;
                maxCount = regions[el];
            }
        
        }

        return maxEl;

}











//to find defender king

function defenderKing(array)
{

       // if(array[0].defender_king.length == 0)
           // return null;
        let defender = {};
        let maxEl = array[0].defender_king, maxCount = 1;
        for(let i = 0; i < array.length; i++)
        {
            let el = array[i].defender_king;
            if(defender[el] == null)
                defender[el] = 1;
            else
                defender[el]++;  
            if(defender[el] > maxCount)
            {
                maxEl = el;
                maxCount = defender[el];
            }
        }
        return maxEl;

}





//to find attacker king

function AttackerKing(array)
{
       // if(array[0].attacker_king.length == 0)
           // return null;
        let attacker = {};
        let maxEl = array[0].attacker_king, maxCount = 1;
        for(let i = 0; i < array.length; i++)
        {
            let el = array[i].attacker_king;
            if(attacker[el] == null)
                attacker[el] = 1;
            else
                attacker[el]++;  
            if(attacker[el] > maxCount)
            {
                maxEl = el;
                maxCount = attacker[el];
             }
        }
        return maxEl;
}



function loadUsers()
{
            let xhr=new XMLHttpRequest();
            
            xhr.open('GET','battles.json',true);

            xhr.onload=function()
            {
                let users=JSON.parse(this.responseText);
                
                //console.log(AttackerKing(users));

                //console.log("<br>");

                //console.log(defenderKing(users));

                let BattleType=battleType(users);

                //console.log(findRegion(users));

                let WinLossResult=WinLoss(users);

                let DefenderData=defenderSize(users);

                array.push({"Most_active":{"Attacker_king":AttackerKing(users),"defender_king":defenderKing(users),"region":findRegion(users)},"attacker_outcome":{"win":WinLossResult[0],"loss":WinLossResult[1]},"battle_type":BattleType,"defender_size":{"average":DefenderData[0],"minimum":DefenderData[1],"maximum":DefenderData[2]}});
                
                //console.log(array);
                // output+='<ul>'+"Most_active"+
                // '<li>'+"attacker_king:"+AttackerKing(users)+'<li>'+
                // '<li>'+"attacker_king:"+AttackerKing(users)+'<li>'+
                // '<li>'+"attacker_king:"+AttackerKing(users)+'<li>'+
                // '<ul>'+"attacker_outcome"+
                // '<li>'+"attacker_king:"+AttackerKing(users)+'<li>'+
                // '<li>'+"attacker_king:"+AttackerKing(users)+'<li>'+
                // '<ul>'+for(var i=0;i<BattleType.length;i++)+
                // '<li>'+battleType[i]'<li>'+
                
                // '<ul>'+"Most_active"+
                // '<li>'+"attacker_king:"+AttackerKing(users)+'<li>'+
                // '<li>'+"attacker_king:"+AttackerKing(users)+'<li>'+
                // '<li>'+"attacker_king:"+AttackerKing(users)+'<li>'+
                




                document.getElementById("users").innerText=JSON.stringify(array,null,"\t");
             }
            xhr.send();
}












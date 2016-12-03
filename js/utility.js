function HTTPObject(){
    //xmlhttp est la variable qui va contenir l'objet lui m�me
    var xmlhttp = false;
    
    //args est le tableau des valeurs � passer � la page que l'on veut appeler
    var args=new Array();
    
    //vars est un tableau de valeurs associ�es � l'objet lui m�me. 
    //On peut y stocker des valeurs � utiliser apr�s le retour de la fonction
    var vars=new Array();
    
    //Cette partie du code permet de cr�er l'objet XMLHTTPRequest en fonction du navigateur
    if ( window.XMLHttpRequest ){
        xmlhttp = new window.XMLHttpRequest();
    }    else {
        if ( window.ActiveXObject ) {
            //Le code de cr�ation pour Windows est simple.
            //On peut le simplifier pour g�rer les diff�rente versions de l'objet
             xmlhttp = new window.ActiveXObject( "Microsoft.XMLHTTP" );
        }    else    {
             throw "XMLHTTPRequest non support�";
        }
    }
    //Cette m�thode permet d'ajouter des �l�ments au tableau args
    this.addArg = function(p,v){
        args[p]=v;
    }
    //Cette m�thode permet d'ajouter des �l�ments au tableau vars
    this.setVar = function(p,v){
        vars[p]=v;
    }
    //M�thode pour r�cup�rer une valeur de vars
    this.getVar = function(p){
        return vars[p];
    }

    //M�thode pour r�cup�rer une valeur de args
    this.getArg = function(p){
        return args[p];
    }
    
    //CallBack permet de sp�cifier le nom de la fonction � appeler apr�s le traitement asynchrone
    //Deux valeurs seront renvoy�es : 
    //- L'objet XMLHTTP lui m�me 
    //- le tableau des Variables que on y a sauvegard�
    this.callBack = function(func){
      xmlhttp.onreadystatechange = function() {
          if(xmlhttp.readyState != 4) return;
            try {xmlhttp.status;}
            catch (e) {return;}
          if ( xmlhttp.status != '200' ) {
              return;
          } else {
              eval(func+'(xmlhttp,vars);');
            }
      }
    }
    //Appel � la page de traitment avec la m�thode POST
    this.post = function(p){
        s='';
        for(x in args)
            s+='&'+x+'='+args[x];
        xmlhttp.open('POST',p,true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(s);
    }
    //Appel � la page de traitment avec la m�thode GET
    this.get = function(p){
        s='';
        for(x in args)
            s+='&'+x+'='+args[x];
        xmlhttp.open('GET',p+'?'+s,true);
        xmlhttp.send(null);
    }
}

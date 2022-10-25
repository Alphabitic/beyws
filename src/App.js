import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import './App.css';
import Footer from '../src/Footer'
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import signature2 from './signature2.png'
import Mails from './Mails'
import NavBar from './NavBar';
import Select from 'react-select'
import userEvent from '@testing-library/user-event';
import Button from 'react-bootstrap/Button';


firebase.initializeApp({
  apiKey: "AIzaSyAcxp-IE-gh8uNcY25_R5ntuM63XAr7b4E",
  authDomain: "utils-apps.firebaseapp.com",
  projectId: "utils-apps",
  storageBucket: "utils-apps.appspot.com",
  messagingSenderId: "646929080710",
  appId: "1:646929080710:web:d8f17d43fd5e84b6520c07",
  measurementId: "G-59RBYHE88H"
});

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);



  return (
    <>
     
    
      <section>

        {user ? <Outils/> : <SignIn />}
              
      </section>  




    </>
  );
}

function Outils () {
  return (
    <>         <Router>
      <NavBar    SignOut={SignOut}/>
        <Routes>
        <Route exact path="/mail" element={<ChatRoom />} />
        <Route exact path="/" element={<Mails />} />
        <Route exact path="/appels" element={<Appels />} />
         <Route exact path="/alertes" element={<Alertes />} />
      </Routes>
      </Router>
      </>
  )
      
}



function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <div className="container mt-10 text-center ">

        <button className="btn btn-primary form-group mx-sm-3 mb-2 mt-5" onClick={signInWithGoogle}> Connexion avec Google</button> 
      </div>

    </>
  )

}

function SignOut() {
  firebase.auth().signOut();
  return auth.currentUser && (
    <button onClick={SignOut}>Déconnexion</button>
  )
}





function ChatRoom() {

  const [isVisible, setIsVisible] = useState(true);
  const handleClick = event => {
    // 👇️ toggle visibility
    setIsVisible(current => !current);
  };

  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(500);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  const [DemValue, setDemValue] = useState('');
  const [nomValue, setNomValue] = useState('');
  const [ticketValue, setticketValue] = useState('');
  const [serveurValue, setserveurValue] = useState('');
  const [consoleValue, setconsoleValue] = useState('');
  const [compteValue, setcompteValue] = useState('');
  const [action1Value, setaction1Value] = useState('');
  const [action2Value, setaction2Value] = useState('');
  const [action3Value, setaction3Value] = useState('');
  const [resultatValue, setresultatValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      demande: DemValue,
      nom: nomValue,
        ticket: ticketValue,
      serveur: serveurValue,
        console: consoleValue,
        compte: compteValue,
        action1: action1Value,
        action2: action2Value,
        action3: action3Value,
        resultat: resultatValue
    })
    setDemValue('');
    setFormValue('');
    setticketValue('');
     setNomValue('');
    setserveurValue('');
    setconsoleValue('');
    setcompteValue('');
    setaction1Value('');
    setaction2Value('');
    setaction3Value('');
    setresultatValue('');
    
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }


  return (<>
  <div className="container mt-10 text-center ">
{isVisible? <Button onClick={handleClick} className='mt-3' variant="dark"> Cacher</Button>:<Button onClick={handleClick} className='mt-3' variant="dark"> Ajouter</Button>}
</div>

 { isVisible && <>
  <form onSubmit={sendMessage}>
                        
                        <div className="container mt-10 text-center ">
                                                        
                                                    <div className="form-group mt-3 ">
                                                        <input
                                                            value={ticketValue}
                                                            type="text"
                                                            className="form-group mt-10 mx-sm-3 mb-2"
                                                            placeholder="Ticket"
                                                            required
                                                            onChange={e => setticketValue( e.target.value )}
                                                        />
                                                        
                                                            <input
                                                                value={nomValue}
                                                                type="text"
                                                                className= "form-group mx-sm-3 mb-2"
                                                                placeholder="Nom"
                                                                required
                                                                onChange={e => setNomValue( e.target.value )}
                                                            />
                        
                                                            <div className="form-group ">
                                                                <input
                                                                    value={DemValue}
                                                                    type="text"
                                                                    className= "form-group mx-sm-3 mb-2"
                                                                    placeholder="demande"
                                                                    required
                                                                    onChange={e => setDemValue( e.target.value )}
                                                                />
                        
                                                            
                                                      
                         
                                                        <input
                                                            value={serveurValue}
                                                            type="text"
                                                            className= "form-group mx-sm-3 mb-2"
                                                            placeholder="Serveur"
                                                            required
                                                            onChange={e => setserveurValue( e.target.value )}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            value={consoleValue}
                                                            type="text"
                                                            className= "form-group mx-sm-3 mb-2"
                                                            placeholder="Console"
                                                            required
                                                           onChange={e => setconsoleValue( e.target.value )}
                                                        />
                                                        
                        
                                                        <input
                                                           value={compteValue}
                                                            type="text"
                                                            className= "form-group mx-sm-3 mb-2"
                                                            placeholder="Compte"
                                                            required
                                                            onChange={e => setcompteValue( e.target.value )}
                                                        />
                                                    </div>
                                               
                                                <div>
                                                    
                                                        <input
                                                           value={action1Value}
                                                            type="text"
                                                            className= "form-group mx-sm-3 mb-2"
                                                            placeholder="Action 1"
                                                            required
                                                            onChange={e => setaction1Value( e.target.value )}
                                                        />
                                                  
                                                        <input
                                                            value={action2Value}
                                                            type="text"
                                                            className= "form-group mx-sm-3 mb-2"
                                                            placeholder="Action 2"
                                                            required
                                                           onChange={e => setaction2Value( e.target.value )}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            value={action3Value}
                                                            type="text"
                                                            className= "form-group mx-sm-3 mb-2"
                                                            placeholder="Action 3"
                                                            required
                                                            onChange={e => setaction3Value( e.target.value )}
                                                        />
                                                    
                                                        <input
                                                          value={resultatValue}
                                                            type="text"
                                                            className= "form-group mx-sm-3 mb-2"
                                                            placeholder="Action 4"
                                                            required
                                                            onChange={e => setresultatValue( e.target.value )}
                                                        />
                                                    </div>
                        
                        
                                                </div>
                                                <div className="form-group">
                                                  <button type="submit" className="btn btn-sm btn-danger">Compiler</button>
                        
                              </div>
                              </div>
                              </form> 
                              

                 </>           

 }
                                <main>
                        
                        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                  
                        <span ref={dummy}></span>
                      </main>

  </>)
}





function ChatMessage(props) {
  const { photoURL,uid, nom, demande, ticket, serveur, console, compte, action1, action2, action3, resultat } = props.message;

  const formatPseudo = pseudo => /[aeiouy]/i.test(demande[0]) ? `l'${demande}` : `la ${demande}`
  const formatP = pseudo => /[aeiouy]/i.test(demande[0]) ? `d'${demande}` : `de ${demande}`
  
function sonia() {
  return (     <div >
              <img src={signature2} className='image' alt="signature" />
               <br/>  <div className="anarana" > <strong> Zolalaina ANDRIANANTENAINA  </strong></div>
                             <div className="anarana2" > Support Flexible Workspace Service </div>
               <div className="orange" >Orange Cloud for Business</div>
                    <div className="adiresy" > helpdesk@neocles.com</div>
               <br /> 
 <div className="norminaly">Orange Business Service SA</div>
              <div className="norminaly">Immeuble Terra Nova II - 15 rue Hendri Rol-Tanguy 93558 Montreuil</div>
               
                        </div >
                         )

  }
    
  const messageClass = uid === auth.currentUser.uid ? 'Admin' : `${firebase.auth().currentUser.email}`;

  return (<>

 <div className='container-fluid'>
        <div className='row mt-5'>

        <div className="col-12 unfluid"> 
        <div className={`d-block$`}>
      
    </div>
       
          <strong>{messageClass} </strong> 
        <br />
          <br />
          <code>
       

       
          {`<div style="font-family: 'Times New Roman', sans-serif !important; font-size: 12pt; ">`}  <br />
          {`<div style="margin-top:15px;">Objet du traitement<strong style="color: #FF8C00;margin-bottom:15px"> : A65MES005</strong></div>`}  <br />
          {` <ol>`}  <br />
          {`<li style="margin-bottom:15px;">Accès au serveur<strong style="color: #3b5998;margin-bottom:15px"> : `}  { serveur} {`</strong></li>`}  <br />
          {`   <li style="margin-bottom:15px;">Outil<strong style="color: #3b5998;"> :`}  { console} {`</strong></li>`}  <br />
         {`   <li style="margin-bottom:15px;">Compte<strong style="color: #3b5998;"> :`}  { compte} {`</strong></li>`}  <br />
         {`    <li style="margin-bottom:15px;">Outils de gestion<strong style="color: #3b5998;"> : Console AD et MMC </strong></li>`}  <br />
           {`  <li style="margin-bottom:10px;" >Actions menées</li>`}  <br />
           {`  <ul>`}  <br />
          
         {`     <div style="color: #556B2F;style="margin-bottom:15px;"> ✅ <strong style="margin-bottom:15px;"> Sur la console AD:</strong>`} 
           {`   <ul>`} 
         {`        <div style="margin-top:15px;">✔ `} {action1};{`</div>`}  <br />
             {`        <div style="margin-top:15px;">✔ `} {action2};{`</div>`}  <br />
             {`  <div><img  style="border : 1px outset ; margin:25px 0;"  src="https://firebasestorage.googleapis.com/v0/b/storage-imgg.appspot.com/o/A65_RH.PNG?alt=media&token=01b32e90-099e-48bd-8efa-637b39ecfabf" alt="A65" border="0"></div>`} 
       {`     </ul>`}  <br />
         {`    </div>`}  <br />
         {`    <div style="color: #556B2F;">✅<strong style="margin-bottom:15px;"> Sur console NAS via mmc: </strong>`}  <br />
           {`    <ul>`}  <br />
           {`      <div style="margin-top:15px;">✔ `} {action3};{`</div>`}  <br />
               {`    <a style="margin-bottom:15px;"><img  style="border : 1px outset ; margin:25px 0;"  src="https://firebasestorage.googleapis.com/v0/b/storage-imgg.appspot.com/o/doirtESATAvant.PNG?alt=media&token=934bb8fa-7341-4c00-91e6-2e3d86be1551" alt="A65" border="0"> </a> `}   <br />
             {`          <a><img  style="border : 1px outset ; width:400px; height:50vh; margin:25px 0;"  src="https://firebasestorage.googleapis.com/v0/b/storage-imgg.appspot.com/o/Droiattribu%C3%A9.PNG?alt=media&token=69f453a4-06b9-4ac0-ae3c-737aff462e97" alt="A65" border="0"></a>`}  <br />
                   {`       <div style="margin-bottom:15px;">✔ `} {resultat};{`</div>`}  <br />
               {`      <div><img  style="border : 1px outset ; width:300px; height:50vh; margin:25px 0;"  src="https://firebasestorage.googleapis.com/v0/b/storage-imgg.appspot.com/o/A65Bon.PNG?alt=media&token=744e0c49-3753-4dbc-9227-300b15d13fb6" alt="A65" border="0"></div>`}  <br />
             {`    </ul>`}  <br />
           {`     </ul>`}  <br />
             {`     </ol>`}  <br />
             {`   </div>`}  <br />
         {`</div>`}  <br /> 
  
       
              </code>
        </div>
   
       
       
      
        
         </div>
                           <div className="row align-items-md-stretch">
                <div className="col-md-6">
        <div className="h-100 p-5 bg-light rounded-3">
          <div><strong>Mail de suspension</strong></div>
            <div>Bonjour M. { nom} ,</div>
            <br/>
                                <div>Je fais suite à votre demande sous la référence "{ ticket}" par rapport à {formatPseudo(demande) }</div>
                              
            <br/><div>Le nécessaire a été fait concernant votre demande. Après avoir fait la {action1}, la {action2} et la {action3}.</div>
              <br />       <div>Après vérification, le resultat est
                {resultat} </div>
                            <br/>    <div>Pourriez-vous s’il vous plaît effectuer un test ?</div>
                                <div>En vous remerciant, par avance de votre collaboration.</div>
                               <br/>
            <div>Dans l’attente, je procède à la suspension de votre ticket.</div>
            <br/>
                                <div>Au plaisir de vous aider, n’hésitez pas à revenir vers nous en cas de besoin</div>
                             
            <br />
                        <div>Cordialement,</div>
            {sonia()}
     </div>
    </div>
          <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-3">
                                <div><strong>Mail de fin de suspension après plusieurs relances</strong></div>
                              <br/>  <div>Bonjour M. { nom},</div>
            <br />   <div>Je reviens vers vous par rapport à votre demande {formatP(demande)} ticket sous la référence "{ ticket}" </div>
                             <br/>   <div>Le nécessaire a été effectué concernant votre demande.</div>
                            <br/>    <div>Sauf erreur de ma part, nous n’avons pas encore reçu votre retour à ce sujet malgré plusieurs relances par mail et par téléphone. </div>
                           <br/>     <div>De ce fait, nous mettons fin à la suspension de ce ticket pour clôture.</div>
                          <br/>      <div>Je vous remercie de nous avoir sollicité, je me tiens à votre disposition pour d’éventuelles questions.</div>
                        <br />    <div>Cordialement,</div>
                      {sonia()}
           </div>
    </div>
      </div>
      <div className="row align-items-md-stretch">
                <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-3">
          <div><strong>Mail de suspension</strong></div>
            <div>Bonjour M. { nom},</div>
            <br/>
                                <div>Je fais suite à votre demande sous la référence "{ticket}" par rapport à {formatPseudo(demande) }</div>
                              
            <br/><div>Le nécessaire est fait au sujet de votre demande. ci-suivant les actions effectuées: {action1}</div>
                         <br/>       <div>- { action1} </div>
              <div>- {action2} </div>
              <div>- { action3} </div>
                            <br/>    <div>Le résultat est concluant de mon côté. Pourriez-vous s’il vous plaît effectuer un test ?</div>
                                <div>En vous remerciant, par avance de votre collaboration.</div>
                               <br/>
            <div>Dans l’attente, je procède à la suspension de votre ticket.</div>
            <br/>
                                <div>Au plaisir de vous aider, n’hésitez pas à revenir vers nous en cas de besoin</div>
                             
            <br />
                        <div>Cordialement,</div>
                      {sonia()}
     </div>
    </div>
          <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-3">
                                <div><strong>Mail de fin de suspension</strong></div>
                              <br/>  <div>Bonjour M. {nom},</div>
                             <br/>   <div>Je reviens vers vous par rapport à votre demande {formatP(demande)} ticket sous la référence " { ticket} " </div>
                             <br/>   <div>Le nécessaire a été effectué concernant votre demande.</div>
              <br />    <div>Suite à votre confirmation, la {demande} est effective</div>
                           <br/>     <div>De ce fait, je me permets de mettre fin à la suspension de ce ticket pour clôture.</div>
                          <br/>      <div>Je vous remercie de nous avoir sollicité, je me tiens à votre disposition pour d’éventuelles questions.</div>
                        <br />    <div>Cordialement,</div>
                       {sonia()}
           </div>
    </div>
      </div>

      <div className="row align-items-md-stretch">
                <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-3">
      <div><strong>Mail de cloture</strong></div>
                              <br/>  <div>Je fais suite à votre demande sous la référence "{ ticket} " au sujet de la demande {formatPseudo(demande) }.</div>
                              <br/>  <div>{ demande} est bien effective. </div>
                             <br/>   <div>De ce fait, je procède donc à la clôture de ce ticket.</div>
                             <br/>   <div>Je vous remercie d’avoir sollicité le support Orange Business Services et reste à votre disposition en cas de besoin.</div>
                             <br/>   <div>Cordialement,</div>
  {sonia()}
                             </div>
        </div>
          <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-3">
                                <div><strong>Mail de cloture</strong></div>
                               <br/>
                              <br/>  <div>Je reviens vers vous concernant la demande "{formatP(demande)} " référencée sur le ticket <strong>{ ticket}</strong></div>
                             <br/>   <div>Suite à votre confirmation, le nécessaire a été effectué concernant votre demande.</div>
                             <br/>   <div>Par conséquent, je procède donc à la clôture de ce ticket.</div>
                             <br/>   <div>Je vous remercie d’avoir sollicité le support Orange Business Services et reste à votre disposition en cas de besoin.</div>
                        <br />   <div>Cordialement,</div>
                    {sonia()}
                        </div>
      </div>        
                        </div>                   
    </div> 
    <Footer/>
  </>)
}
function Appels() {


  
  const dummy = useRef();
  const appelsRef = firestore.collection('appels');
  const query = appelsRef.orderBy('createdAt').limit(100);

  const [appels] = useCollectionData(query, { idField: 'id' });

  const [formName, setFormName] = useState('');
  const [LogValue, setLogValue] = useState('');
  const [SocValue, setSocValue] = useState('');
  const [ticketValue, setticketValue] = useState('');
  const [Pb, setPbValue] = useState([]);
 


  const makeAppel = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await appelsRef.add({
      nom: formName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      Logs: LogValue,
      societe: SocValue,
        ticket: ticketValue,
      Pb: Pb

   
    
    })
    setFormName('');
    setLogValue('');
    setticketValue('');
     setSocValue('');
    setPbValue('');
    
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }


  return (<>

  
 
 <form onSubmit={makeAppel}>
                        
<div className="container mt-10 text-center ">
                                
                            <div className="form-group mt-3 ">
                                <input
                                    value={ticketValue}
                                    type="text"
                                    className="form-group mt-10 mx-sm-3 mb-2"
                                    placeholder="Ticket"
                                  
                                    onChange={e => setticketValue( e.target.value )}
                                />
                                
                                    <input
                                        value={formName}
                                        type="text"
                                        className= "form-group mx-sm-3 mb-2"
                                        placeholder="Nom"
                                        required
                                        onChange={e => setFormName( e.target.value )}
                                    />

                                    <div className="form-group ">
                                        <input
                                            value={LogValue}
                                            type="text"
                                            className= "form-group mx-sm-3 mb-2"
                                            placeholder="Login"
                                            required
                                            onChange={e => setLogValue( e.target.value )}
                                        />

                                    
                              
 
                                <input
                                    value={SocValue}
                                    type="text"
                                    className= "form-group mx-sm-3 mb-2"
                                    placeholder="Société"
                                    required
                                    onChange={e => setSocValue( e.target.value )}
                                />
                            </div>
                            <div className="form-group">
                                <select  onChange={e => setPbValue( e.target.value )} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" >
  <option  value="Connexion Citrix,problème d'accès à la session Citrix/Problème d'authentification">Connexion Citrix/Problème d'accès à la session Citrix/Problème d'authentification</option>
  <option  value="La session est figée, la session est bloquée" >La session est figée / la session est bloquée</option>
              <option value="Problème d'accès à une application" >Problème d'accès à une application. (Utilisateur déjà dans la session)</option>
              <option value="L'application est figée, la session est bloquée | Utilisateur déjà dans sa session " >L'application est figée / la session est bloquée. "Utilisateur déjà dans sa session"</option>
              <option value="Lenteur dans la session || Utilisateur déjà dans sa session" >Lenteur dans la session || Utilisateur déjà dans sa session</option>
              <option value="Problème d'envoi mail">Problème d'envoi mail</option>
              <option  value="Problème de réception mail">Problème de réception mail</option>
              <option  value="Problème d'imprimante">Problème d'imprimante</option>
</select>

                       </div>          


                        </div>
                        <div className="form-group">
                          <button type="submit" className="btn btn-sm btn-danger">Compiler</button>

      </div>
      </div>

      
       <main>

      {appels && appels.map(msg => <AppelsEmis key={msg.id} message={msg} />)}

      <span ref={dummy}></span>
    </main>
    </form>

  </>)
}



function AppelsEmis(props) {
  const { nom, Logs, ticket, societe, Pb } = props.message;


  return (<>
 
    <div  className="text-left mt-5"> 
      <div className="ATD ml-5"> <strong>Ticket: </strong> {ticket} 
        <br />
         <br/>
                            <span> { nom} dont le login est '' { Logs} '' de la société { societe} a appelé. </span>
        <ul>
           <br/>
          <div><strong>Blocages: <br/> { Pb }</strong> </div> <br/>
     <br/>
          <div><strong>Ticket N° : <br/> { ticket } </strong><br/> { Pb}</div>
   <br/>
                               
        </ul>
        </div>
                           <div className="row align-items-md-stretch">
                <div className="col-md-6">
        <div className="h-100 p-5 bg-light rounded-3">
          <div><strong>Discours</strong></div>
            <div>Support OBS , bonjour ! André à votre écoute! En quoi puis-je vous aider ?</div>
            <br/>
                                <div>D’accord, pour mieux vous aider, <strong> puis-je avoir votre nom, votre login ainsi que le nom de votre société ? </strong> </div>
                              
            <br/><div>Très bien, Pouvez-vous m’exposer votre situation ?</div>
            <br />       <div>Si je comprends bien, {Pb }, c'est bien cela? </div>
                            <br/>    <div>Pourriez-vous s’il vous plaît effectuer un test ?</div>
            <div>Quel message d'erreur vous renvoi votre session quand vous essayez de vous connecter ? 
              <br />
              Etes-vous la seule personne impactée ?
              <br />
              Depuis quand vous avez ce blocage ?
              <br />
      <strong>Attente : Je vous prie de bien vouloir patienter un instant, je vais vérifier ... Etes-vous toujours en ligne M { nom } ? Je vous remercie d'avoir patienter,</strong> </div>
                               
                               <br/>
            <div>Si le problème persiste:
              Je vous invite à vous rapprocher de votre correspondant informatique afin qu'il fasse un mail pour une réinitialisation.
              <br/>
J'ai quelques lenteurs au niveau de mes outils et cela va prendre certainnement un peu de temps, je fais le manipulation de mon côté et je vous rappelle dès que c'est bon. Vous me le permettez?</div>
            <br/>
                                <strong>Avez-vous d’autres question à me soumettre svp ? </strong>
                             
            <br />
            
              

            </div>

      </div>        
          </div>

    </div>
                        <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-2">
                                <div><strong>Objet : Accusé de reception de votre demande </strong></div>
        <br />
        Madame, Monsieur,
        <br />
        Nous accusons réception de votre demande du ... concernant ....
                              <br/>  <div> Un ticket a été ouvert de notre côté sous la référence ... <strong></strong></div>
        <br />   <div>Nous vous serions reconnaissants de bien vouloir patienter le temps de son traitement.
          <br/>Notre équipe vous fera un retour dans les plus bref delai.</div>
        <br />  
                             <br/>   <div>Je vous remercie d’avoir sollicité le support Orange Business Services et reste à votre disposition en cas de besoin.</div>
        <br />   <div>Cordialement,</div>
         <div >
              <img src={signature2} className='image' alt="signature" />
                            <br/>    <div className="anarana2" > Support Flexible Workspace Service </div>
               <div className="orange" >Orange Cloud for Business</div>
              <br />      <div className="adiresy" > helpdesk@neocles.com</div>
               <br /> 
              <div className="norminaly">Orange Business Service SA</div>
              <div className="norminaly">Immeuble Terra Nova II - 15 rue Hendri Rol-Tanguy 93558 Montreuil</div>
               
                        </div >
                  
                        </div>
                        <div >
          </div>
          
          
    </div> 
    <Footer/>
  </>)
}

function Alertes() {


  
  const dummy = useRef();
  const appelsRef = firestore.collection('Alertes');
  const query = appelsRef.orderBy('createdAt').limit(25);

  const [appels] = useCollectionData(query, { idField: 'id' });

  const [formName, setFormName] = useState('');
  const [LogValue, setLogValue] = useState('');
  const [SocValue, setSocValue] = useState('');
  const [ticketValue, setticketValue] = useState('');
  const [Pb, setPbValue] = useState([]);
 


  const makeAlertes = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await appelsRef.add({
      nom: formName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      Logs: LogValue,
      societe: SocValue,
        ticket: ticketValue,
      Pb: Pb

   
    
    })
    setFormName('');
    setLogValue('');
    setticketValue('');
     setSocValue('');
    setPbValue('');
    
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }


  return (<>

  
 
 <form onSubmit={makeAlertes}>
                        
<div className="container mt-10 text-center ">
                                
                            <div className="form-group mt-3 ">
                                <input
                                    value={ticketValue}
                                    type="text"
                                    className="form-group mt-10 mx-sm-3 mb-2"
                                    placeholder="Ticket"
                                  
                                    onChange={e => setticketValue( e.target.value )}
                                />
                                
                                    <input
                                        value={formName}
                                        type="text"
                                        className= "form-group mx-sm-3 mb-2"
                                        placeholder="Type d'alertes"
                                        required
                                        onChange={e => setFormName( e.target.value )}
                                    />

                                    <div className="form-group ">
                                        <input
                                            value={LogValue}
                                            type="text"
                                            className= "form-group mx-sm-3 mb-2"
                                            placeholder="Serveur"
                                            required
                                            onChange={e => setLogValue( e.target.value )}
                                        />

                                    
                              
 
                                <input
                                    value={SocValue}
                                    type="text"
                                    className= "form-group mx-sm-3 mb-2"
                                    placeholder="Société"
                                    required
                                    onChange={e => setSocValue( e.target.value )}
                                />
                            </div>
                                    


                        </div>
                        <div className="form-group">
                          <button type="submit" className="btn btn-sm btn-danger">Compiler</button>

      </div>
      </div>

      
       <main>

      {appels && appels.map(msg => <Alerterecue key={msg.id} message={msg} />)}

      <span ref={dummy}></span>
    </main>
    </form>

  </>)
}


function Alerterecue(props) {
  const { nom, Logs, ticket, societe } = props.message;


  return (
  <>
 
    
 <div  className="text-left mt-5"> 
  
                        <div className="col-md-6">
        <div className="h-100 p-5 bg-light border rounded-2">
                                <div><strong>Mail de résolution d'alertes</strong></div>
        <br />
        Je fais suite à l'alerte répértoriée sous le ticket "{ticket}" sur le serveur {Logs} pour la société {societe}
                              <br/>  <div> Après le redemarrage et la vérification, l'alerte n'est plus d'acualité!, <strong></strong></div>
        <br />   <div>De ce fait, je me permets de clôre le présent ticket.
         
                             <br/>   <div>Je reste à votre disposition en cas de besoin.</div>
        <br />   <div>Cordialement,</div>
         <div >
              <img src={signature2} className='image' alt="signature" />
               <br/>  <div className="anarana" > <strong>ANDRIANANTENAINA Zolalaina </strong></div>
                            <br/>    <div className="anarana2" > Support Flexible Workspace Service </div>
               <div className="orange" >Orange Cloud for Business</div>
              <br />      <div className="adiresy" > helpdesk@neocles.com</div>
               <br /> 
 <div className="norminaly">Orange Business Service SA</div>
              <div className="norminaly">Immeuble Terra Nova II - 15 rue Hendri Rol-Tanguy 93558 Montreuil</div>
               
                        </div >
                        </div >
            </div >
          </div >
          </div >
        
      
    </>)
    
}




export default App;

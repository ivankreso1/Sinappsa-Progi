import { Button, Card, DropdownButton, Form } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import React, { useState } from "react";
import configData from "../resources/config.json";


export default function CreateAd() {

   const [kolegiji, setKolegiji] = useState([""])
   let categories = ["LABOS", "BLIC", "GRADIVO", "KONTINUIRANI_ISPIT", "ISPITNI_ROK"]

   React.useEffect( () => {
      fetch(`${configData.hostname}/kolegiji`)
         .then(res => res.json()
         .then(data => {
         setKolegiji(data)
      }))
   }, [])
      
   function onSubmit(event) {
      event.preventDefault();
   }

   return (
      <><h1> Stranica za kreiranje oglasa </h1>
      <div className="container">
         <Card style={{boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", minWidth: "400px", maxWidth: "480px", display: "flex", alignContent: "center", alignItems: "center", borderRadius: "10px"}}>
            <Form className="form" onSubmit={onSubmit}>
               <Form.Group>
                  <Form.Label>Naslov oglasa</Form.Label>
                  <Form.Control type="text" placeholder="Naslov" name="naslov"></Form.Control>
               </Form.Group>
               <Form.Group>
                  <Form.Label>Opis problema/ponude</Form.Label>
                  <Form.Control as="textarea" rows="3" name="opis"></Form.Control>
               </Form.Group>
               <DropdownButton name="kolegij" title='Kolegiji'>
                  {kolegiji.map(kolegij => {return <DropdownItem name="kolegij">{kolegij.ime}</DropdownItem>})}
               </DropdownButton>
               <DropdownButton name="kategorija" title='Kategorija'>
                  {categories.map(cat => {return <DropdownItem name="kategorija">{cat}</DropdownItem>})}
               </DropdownButton>
               <Button type="submit">Submit</Button>
            </Form>
         </Card>
      </div>
      </>
   )
}
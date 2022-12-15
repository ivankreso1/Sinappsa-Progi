import { Button, Card, DropdownButton, Form } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";


export default function CreateAd() {
   return (
      <><h1> Stranica za kreiranje oglasa </h1>
      <div className="container">
         <Card style={{boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px", minWidth: "400px", maxWidth: "480px", display: "flex", alignContent: "center", alignItems: "center", borderRadius: "10px"}}>
            <Form className="form">
               <Form.Group>
                  <Form.Label>Naslov</Form.Label>
                  <Form.Control type="text" placeholder="Naslov"></Form.Control>
               </Form.Group>
               <Form.Group>
                  <Form.Label>Opis</Form.Label>
                  <Form.Control as="textarea" rows="3"></Form.Control>
               </Form.Group>
               <DropdownButton>
                  <DropdownItem>Prvi</DropdownItem>
                  <DropdownItem>Drugi</DropdownItem>
                  <DropdownItem>Treći</DropdownItem>
               </DropdownButton>
               <DropdownButton>
                  <DropdownItem>1.</DropdownItem>
                  <DropdownItem>2.</DropdownItem>
                  <DropdownItem>3.</DropdownItem>
               </DropdownButton>
               <Button type="submit">Submit</Button>
            </Form>
         </Card>
      </div>
      </>
   )
}
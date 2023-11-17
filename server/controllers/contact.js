
const Contact = require("../models/contactSchema");

 

const getContacts = async (req, res) =>{
    try{
        const contacts = await Contact.find({userID: req.user.id});

        return res.status(200).json({
            success:true,
            message: "Get All Contacts",
            contacts
        })
    }catch(error){
        return res.status(404).json({
            success:false,
            message: "No Contacts Found"
        })
    }
    
}

//get a single contact
const getContact = async (req, res) =>{
    try{
        const contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({
                success:false,
                message:"Enter the contact to find"
            })
        }
    
        return res.status(200).json({
            success:true,
            message: "Found Contact data",
            contact
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Contact Data could not be found"
        })
    }
    
}

//create a contact
const createContact = async (req, res) =>{
    try{
        const {name, email, phone} = req.body;

        if(!name || !email || !phone){
            return res.status(400).json({
                success:false,
                message: "All data fields are required"
            })
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            userID: req.user.id
        })

        return res.status(201).json({
            success:true,
            message: "New Contact Created",
            contact
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message: "New Contact could not be created"
        })
    }
    
}

//update a contact
const updateContact = async (req, res) =>{

    try{

        const contact = await Contact.findById(req.params.id);

        if(!contact){
            return res.status(404).json({
                success:false,
                message:"No Contact Data"
            })
        }

        if(contact.userID.toString() !== req.user.id){
            return res.status(403).json({
                success:false,
                message:"Cannot change contacts of another user"
            })
        }

        const updatedContact =  await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        return res.status(200).json({
            success:true,
            message: "Contact Updated",
            updatedContact
        })

    }catch(error){
        res.status(400).json({
            success:false,
            message:"Failed to updated Contact"
        })
    }


}

//delete a contact
const deleteContact = async (req, res) =>{
    try{
        const contact = await Contact.findById(req.params.id);
        
        if(!contact){
            return res.status(404).json({
                success:false,
                message:"No Contact Data"
            })
        }

        if(contact.userID.toString() !== req.user.id){
            return res.status(403).json({
                success:false,
                message:"Contact of another user cannot be deleted"
            })
        }

        await Contact.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success:true,
            message: "Contact Deleted",
            contact
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            message: "Contact cannot be Deleted"
        })
    }
    
}

module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};

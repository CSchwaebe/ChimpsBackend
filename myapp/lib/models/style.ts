import { Document, model, Model, Schema } from 'mongoose';

const ThemeSchema: Schema = new Schema({       
    background: String,
    text: String,
    title: String,
});

const ButtonSchema: Schema = new Schema({       
    background: String,
    text: String,   
    dark_mode: Boolean, 
});

const FooterSchema: Schema = new Schema({       
    background: String,
    text: String,    
});


const MenuSchema: Schema = new Schema({       
    primary_background: String,
    primary_text: String,
    topnav_dropdown_background: String,
    topnav_category_text: String,
    topnav_subcategory_text: String,

    sidenav_secondary_background: String,
    sidenav_secondary_text: String,
    sidenav_tertiary_background: String,
    sidenav_tertiary_text: String,  
});

const StyleSchema: Schema = new Schema({       
     theme: ThemeSchema,
     buttons: ButtonSchema,
     footer: FooterSchema,
     menu: MenuSchema
}, { timestamps: true });

let StyleModel: Model<Style> = model<Style>('Style', StyleSchema);

interface Theme extends Document {       
    background: string;
    text: string;
    title: string;
};

interface Button extends Document {       
    background: string;
    text: string;
    dark_mode: boolean;
};

interface Footer extends Document {       
    background: string;
    text: string;
    title: string;
};

interface Menu extends Document { 
    primary_background: string;      
    primary_text: string;
    topnav_dropdown_background: string;
    topnav_category_text: string;
    topnav_subcategory_text: string;

    sidenav_secondary_background: string;
    sidenav_secondary_text: string;
    sidenav_tertiary_background: string;
    sidenav_tertiary_text: string;
};

interface Style extends Document {     
    theme: Theme;
    buttons: Button;
    footer: Footer;
    menu: Menu;
};

export { Theme, Footer, Button, Menu, Style, StyleModel, StyleSchema, ThemeSchema, ButtonSchema, FooterSchema, MenuSchema };


  
  
  
  
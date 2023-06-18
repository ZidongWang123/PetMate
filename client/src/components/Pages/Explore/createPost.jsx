// import React, {useEffect,useState} from "react";
// import ImageUploader from 'react-images-upload';

// export default function CreatePost(){

//    const [pictures,setPictures]=useState([])

//    const onDrop=(pictureFiles, pictureDataURLs)=> {
//         setPictures(pictureFiles)

//     }

   
//     return (
//         <ImageUploader
//             withIcon={true}
//             buttonText='Choose images'
//             onChange={onDrop}
//             imgExtension={['.jpg', '.gif', '.png', '.gif',"jpeg"]}
//             maxFileSize={524288000}
//         />
//     );
    
// }
import React from 'react';
import ImageUploader from 'react-images-upload';

class CreatePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureFiles
        });
        console.log(3)
        console.log(pictureFiles)
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        );
    }
}
export default CreatePost
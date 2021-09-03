import { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./MemoryForm.css";
import {createMemory} from "../../store/memories"
import { setMemoryCards } from "../../store/mainContent";



const MemoryForm = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.session.user.id);
    

    const [title, setTitle] = useState("");
    const [dateOfMemory, setDateOfMemory] = useState("");
    const [location, setLocation] = useState("");
    const [memoryRating, setMemoryRating] = useState(5);
    const [body, setBody] = useState("");
    const [image, setImage] = useState(null);
    const [disabled, setDisabled] = useState(false)
    
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDateOfMemory = (e) => setDateOfMemory(e.target.value);
    const updateLocation = (e) => setLocation(e.target.value);
    const updateMemoryRating = (e) => setMemoryRating(e.target.value);
    const updateFile = (e) => {
      const file = e.target.files[0];
      if (file) setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)

        const payload = {
            title,
            dateOfMemory,
            location,
            memoryRating,
            image,
            body,
            userId
        }

        const memory = await dispatch(createMemory(payload));
        if (memory) {
          setTitle("");
          setDateOfMemory("");
          setLocation("");
          setMemoryRating(5);
          setBody("");
          dispatch(setMemoryCards())
        }
      }

        

      
    return (
      <div className='memory-form-container'>
        <form onSubmit={handleSubmit} id="memory-form" className="memory-form">
          <input
            type="text"
            placeholder="Date of Memory ex: 2021-12-21"
            required
            pattern="([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))"
            value={dateOfMemory}
            onChange={updateDateOfMemory}
            className="memory-input"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={updateLocation}
            className="memory-input"
          />
          <input
            type="number"
            placeholder="Memory Rating"
            min="1"
            max="10"
            value={memoryRating}
            onChange={updateMemoryRating}
            className="memory-input"
          />
          <input type='file' onChange={updateFile} />
          <div className='CKEditor-container'>
            <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: ['heading', '|', 'bold', 'italic', '|', 'undo', 'redo', '|', 'bulletedList', 'numberedList', ],
                }}
                data={body}
                onChange={(e, editor) => {
                    const data = editor.getData();
                    setBody(data);
                }}
                />
          </div>
          <button type="submit" className="memory-form-button" disabled={disabled}>Store your memory!</button>
        </form>
      </div>
    );

}

export default MemoryForm;
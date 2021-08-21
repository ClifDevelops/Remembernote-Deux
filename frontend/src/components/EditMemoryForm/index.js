import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./EditMemoryForm.css";
import {updateMemory} from "../../store/memories"



const EditMemoryForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {memoryId} = useParams();
    const memory = useSelector(state => state?.memories[memoryId]);
    const userId = useSelector((state) => state.session.user.id);
    

    const [title, setTitle] = useState(memory?.title);
    const [dateOfMemory, setDateOfMemory] = useState(memory?.dateOfMemory);
    const [location, setLocation] = useState(memory?.location);
    const [memoryRating, setMemoryRating] = useState(memory?.memoryRating);
    const [body, setBody] = useState(memory?.body);
    const [image, setImage] = useState(null)
    
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDateOfMemory = (e) => setDateOfMemory(e.target.value);
    const updateLocation = (e) => setLocation(e.target.value);
    const updateMemoryRating = (e) => setMemoryRating(e.target.value);
    const updateFile = (e) => {
      const file = e.target.files[0];
      if (file) setImage(file);
    };

    const headHome = () => {
      history.push('/homepage')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            dateOfMemory,
            location,
            memoryRating,
            image,
            body,
            userId,
            memoryId
        }

        const memory = await dispatch(updateMemory(payload));
        if (memory) {
          setTitle("");
          setDateOfMemory("");
          setLocation("");
          setMemoryRating(5);
          setBody("");
          history.push(`/memories/${memoryId}`)
        }
      }

        

      
    return (
      <>
      <button className="edit-to-home-button" onClick={headHome}>Head Back Home</button>
      <section className="memory-form-container">
        <form onSubmit={handleSubmit} id="memory-form" className="memory-form">
          <input
            type="text"
            placeholder="Title of Memory"
            value={title}
            onChange={updateTitle}
            className="memory-input"
          />
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
          {memory?.pictureUrl ? (
            <img src={memory.pictureUrl} alt='memory' class='memory-form-image-display' />
          ) : null}
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
          <button type="submit" className="memory-form-button">Update your memory!</button>
        </form>
      </section>
      </>
    );

}

export default EditMemoryForm;
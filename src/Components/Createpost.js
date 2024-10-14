import { useState } from "react";

const CreatePost = () => {
  const [uploadImage, setUploadImage] = useState(
    "https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
  );

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="createPost flex justify-center py-5 ">
      <div
        id="uploadPost"
        className="bg-slate-200 border border-black h-[550px] w-[400px] shadow-2xl"
      >
        {console.log(uploadImage)}
        <img className="h-[510px] w-full" src={uploadImage} />
        <input
          id="fileInput"
          className="hidden"
          type="file"
          onChange={handleChange}
        />
        <button
          className="bg-[#395168] w-full h-[40px] font-bold text-white"
          onClick={triggerFileInput}
        >
          Upload Image
        </button>
      </div>
      <div className="w-[410px] h-[550px]  shadow-2xl">
        <div id="inputText" className="h-[355px]">
          <textarea
            className="w-full  border border-black p-2 h-full"
            rows="8"
            placeholder="Write your post description"
          ></textarea>
        </div>
        <div id="platformSelection" className="flex border border-black h-[195px] bg-[ECF0F1]"
        >
          <div className="flex flex-col px-3 border ">
            <label className="flex items-center justify-start space-x-4 my-2">
              <input class="custom-checkbox" type="checkbox" name="option1" />
              <i class="fa-brands fa-twitter fa-xl"></i>
              <h2 className="font-rajdhani text-xl">Twitter</h2>
            </label>
            <label className="flex items-center justify-start space-x-4 my-2">
              <input class="custom-checkbox" type="checkbox" name="option2" />
              <i class="fa-brands fa-facebook fa-xl"></i>
              <h2 className="font-rajdhani text-xl">Facebook</h2>
            </label>
            <label className="flex items-center justify-start space-x-4 my-2">
              <input class="custom-checkbox" type="checkbox" name="option3" />
              <i class="fa-brands fa-linkedin fa-xl"></i>
              <h2 className="font-rajdhani text-xl">LinkedIn</h2>
            </label>
            <label className="flex items-center justify-start space-x-4 my-2">
              <input class="custom-checkbox" type="checkbox" name="option4" />
              <i class="fa-brands fa-instagram fa-xl"></i>
              <h2 className="font-rajdhani text-xl">Instagram</h2>
            </label>
          </div>

          <div id="uploadButtons" className="flex flex-col flex-start">
            <div className="border h-[60px] w-full">
              <button className="bg-[#496885] p-2 text-white rounded-sm w-full mt-5">
                Post Now
              </button>
            </div>
            <div className="w-full pt-2">
              <p className="my-4 text-left">Schedule your post at </p>
              <input
                className="bg-[#496885] p-2 text-white rounded-sm"
                type="datetime-local"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

import React, { useState } from "react";
import "./Homepage.css";

function Homepage() {
  const [userPhoto, setUserPhoto] = useState(null);

  const handleFileExplorer = () => {
    const fileExplorer = document.createElement("input");
    fileExplorer.setAttribute("type", "file");
    fileExplorer.setAttribute("accept", "image/*");
    fileExplorer.click();

    fileExplorer.addEventListener("change", () => {
      if (fileExplorer.files[0]) {
        setUserPhoto(URL.createObjectURL(fileExplorer.files[0]));
      }
    });
  };

  return (
    <div className="homepage-container">
      <div className="page-counter-loader">
        <div className="page-counter-loader-text">
          <div>Page 1 of 3</div>
        </div>
      </div>
      <div className="body-container">
        <div className="octo-avatar">
          <div className="octo-avatar-text">
            <div>Octo</div>
          </div>
        </div>

        <div className="side-container">
          <div className="welcome-text">
            <div className="welcome-text-title">
              My name is OCTO! And you are...
            </div>
          </div>

          <div className="user-photo-area-container">
            <div className="user-photo-area">
              <div className="user-photo">
                <div className="user-photo-square">
                  <img
                    src="link will should be here"
                    alt="user photo"
                    className="user-photo-img"
                  />
                </div>
              </div>

              <button
                onClick={handleFileExplorer}
                className="user-photo-upload-button"
              >
                <div className="user-photo-button-text">
                  Upload a nice photo!
                </div>
              </button>
            </div>

            <div className="user-name-area">
              <div className="user-name">
                <div className="user-name-text">
                  <input
                    type="text"
                    placeholder="How would you like me to call you?"
                    className="user-name-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

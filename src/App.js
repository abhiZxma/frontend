import React from "react";
import "./App.css";

function App() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [item_for_sale, setItemForSale] = React.useState(false);
  const [item_price, setPrice] = React.useState("");
  const [accept_term_and_cond, setATC] = React.useState(false);
  const [idToUpdate, setIdToUpdate] = React.useState("");

  const [allRecords, setAllRecords] = React.useState(false);

  React.useEffect(() => {
    document.getElementById("verifyOtpButton").style.display = "none";
    document.getElementById("editForm").style.display = "none";
  }, []);

  const getOtp = async () => {
    try {
      if (phoneNumber.length === 10) {
        const body = {
          phone: phoneNumber,
        };
        await fetch("https://mern-3backendapp.herokuapp.com/userregistration", {
          method: "POST",
          body: JSON.stringify(body),
        })
          .then((res) => {
            if (res.status === 200) {
              window.alert("OTP was successfully sent to the phone number.");
              document.getElementById("getOtpButton").style.display = "none";
              document.getElementById("phoneNumberField").disabled = true;
              document.getElementById("verifyOtpButton").style.display =
                "block";
            } else {
              throw res;
            }
          })
          .catch((err) => {
            window.alert("OTP could not be sent to the phone number.");
          });
      } else {
        window.alert("Enter a valid phone number.");
        throw phoneNumber;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async () => {
    try {
      if (phoneNumber.length === 10) {
        const body = {
          phone: phoneNumber,
          otp: otp,
        };
        await fetch("https://mern-3backendapp.herokuapp.com/verifyotp", {
          method: "POST",
          body: JSON.stringify(body),
        })
          .then((res) => {
            if (res.status === 200) {
              window.alert(
                "OTP was successfully verified to the phone number."
              );
              document.getElementById("getOtpButton").style.display = "block";
              document.getElementById("phoneNumberField").disabled = false;
              document.getElementById("verifyOtpButton").style.display = "none";
            } else {
              throw res;
            }
          })
          .catch((err) => {
            window.alert("Could not verify OTP.");
          });
      } else {
        window.alert("Enter a valid phone number.");
        throw phoneNumber;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (e) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      if (e.target.files.length > 0) {
        var data = new FormData();
        data.append("image", e.target.files[0]);
        await fetch("https://mern-3backendapp.herokuapp.com/uploadImage", {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((res) => {
            setImageUrl(res.url);
          });
      } else {
        window.alert("Enter an image file.");
        throw e.target.files[0];
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createRecord = async (e) => {
    try {
      const body = {
        image_title: title,
        image_desc: desc,
        image: imageUrl,
        category: category,
        item_for_sale: item_for_sale ? "yes" : "no",
        item_price: item_price,
        accept_term_and_cond: accept_term_and_cond ? "yes" : "no",
      };
      await fetch("https://mern-3backendapp.herokuapp.com/createImageRecord", {
        method: "POST",
        body: JSON.stringify(body),
      }).then((res) => {
        window.alert("New Record created");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editRecord = async (e) => {
    try {
      const body = {
        id: idToUpdate,
        image_title: title,
        image_desc: desc,
        image: imageUrl,
        category: category,
        item_for_sale: item_for_sale ? "yes" : "no",
        item_price: item_price,
        accept_term_and_cond: accept_term_and_cond ? "yes" : "no",
      };
      await fetch("https://mern-3backendapp.herokuapp.com/updateImageRecord", {
        method: "POST",
        body: JSON.stringify(body),
      }).then((res) => {
        window.alert("Record updated");
        document.getElementById("editForm").style.display = "none";
        setIdToUpdate("");
        setTitle("");
        setDesc("");
        setCategory("");
        setItemForSale("");
        setPrice("");
        getAllRecords();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getAllRecords = async (e) => {
    try {
      await fetch("https://mern-3backendapp.herokuapp.com/getAllrecords")
        .then((res) => res.json())
        .then((res) => {
          setAllRecords(res.data);
          window.alert("All records refreshed.");
        });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const body = {
        id: id,
      };
      console.log(body);
      await fetch("https://mern-3backendapp.herokuapp.com/deleterecord", {
        method: "POST",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          getAllRecords();
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Abhishek Tiwari to the rescue</h1>
        <h2>Problem 1 - Solution</h2>

        <label for="phoneNumber">Phone Number</label>
        <input
          id="phoneNumberField"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          name="phoneNumber"
          type="number"
        ></input>

        <br />
        <button id="getOtpButton" onClick={getOtp}>
          GET OTP
        </button>

        <br />

        <label for="otp">OTP</label>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          name="otp"
          type="number"
        ></input>

        <br />
        <button id="verifyOtpButton" onClick={verifyOtp}>
          VERIFY OTP
        </button>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <h2>Problem 2 - Solution</h2>

        <label for="image">Enter the image</label>
        <input
          id="imageField"
          onChange={(e) => uploadImage(e)}
          name="image"
          type="file"
          accept="image/png, image/jpeg"
        ></input>

        <br />

        <label for="title">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          type="text"
        ></input>

        <br />
        <label for="desc">Description</label>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          name="desc"
          type="text"
        ></input>

        <br />

        <label for="category">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          type="text"
        ></input>

        <br />

        <label for="itemForSale">Item is for sale ?</label>
        <input
          value={item_for_sale}
          onChange={(e) => setItemForSale(e.target.checked)}
          name="itemForSale"
          type="checkbox"
        ></input>

        <br />

        <label for="itemPrice">Item Price</label>
        <input
          value={item_price}
          onChange={(e) => setPrice(e.target.value)}
          name="itemPrice"
          type="number"
        ></input>

        <br />

        <label for="atc">Accept T&C</label>
        <input
          value={accept_term_and_cond}
          onChange={(e) => setATC(e.target.checked)}
          name="atc"
          type="radio"
        ></input>

        <br />
        <button id="createRecordButton" onClick={createRecord}>
          CREATE RECORD
        </button>
        <br />
        <br />
        <br />

        <button id="getAllRecordsButton" onClick={getAllRecords}>
          REFRESH RECORDS
        </button>

        <table cellPadding={"10px"} cellSpacing={"10px"}>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>For Sale ?</th>
            <th>Price</th>
            <th>Action</th>
          </tr>

          {allRecords &&
            allRecords.length > 0 &&
            allRecords?.map((record) => (
              <tr>
                <td>{record.image_title}</td>
                <td>{record.image_desc}</td>
                <td>{record.category}</td>
                <td>{record.item_for_sale}</td>
                <td>{record.item_price}</td>
                <td>
                  <button
                    onClick={() => {
                      document.getElementById("editForm").style.display =
                        "block";
                      setTitle(record.image_title);
                      setDesc(record.image_desc);
                      setCategory(record.category);
                      setItemForSale(record.item_for_sale);
                      setPrice(record.item_price);
                      setIdToUpdate(record._id);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteRecord(record._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>

        <div id="editForm">
          <label for="image">Enter the image</label>
          <input
            id="imageField"
            onChange={(e) => uploadImage(e)}
            name="image"
            type="file"
            accept="image/png, image/jpeg"
          ></input>

          <br />

          <label for="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
          ></input>

          <br />
          <label for="desc">Description</label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            name="desc"
            type="text"
          ></input>

          <br />

          <label for="category">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            type="text"
          ></input>

          <br />

          <label for="itemForSale">Item is for sale ?</label>
          <input
            value={item_for_sale}
            onChange={(e) => setItemForSale(e.target.checked)}
            name="itemForSale"
            type="checkbox"
          ></input>

          <br />

          <label for="itemPrice">Item Price</label>
          <input
            value={item_price}
            onChange={(e) => setPrice(e.target.value)}
            name="itemPrice"
            type="number"
          ></input>

          <br />

          <label for="atc">Accept T&C</label>
          <input
            value={accept_term_and_cond}
            onChange={(e) => setATC(e.target.checked)}
            name="atc"
            type="radio"
          ></input>

          <br />
          <button id="editButton" onClick={editRecord}>
            UPDATE RECORD
          </button>
        </div>
        <br />
        <br />
      </header>
    </div>
  );
}

export default App;

import React, { useState, useContext } from "react";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";
import { UserContext} from "./context.js"

function SignUpForm() {

const {setUser} = useContext(UserContext)


  const [username, setUsername] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dob, setDob] = useState("");
  const [lot, setLot] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [photo_id, setPhoto_id] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  // const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: password,
        dob: dob,
        lot: lot,
        street: street,
        city: city,
        state: state,
        zip: zip,
        photo_id: photo_id,
        image_url: imageUrl,
        bio: bio,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } 
      // else {
      //   r.json().then((err) => setErrors(err.errors));
      // }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          autoComplete="off"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          type="text"
          id="last_name"
          autoComplete="off"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="phone">Phone</Label>
        <Input
          type="tel"
          id="phone"
          autoComplete="off"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password Confirmation</Label>
        <Input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
      </FormField>
      <FormField>
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="lot">Lot Number</Label>
        <Input
          type="text"
          id="lot"
          value={lot}
          onChange={(e) => setLot(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="street">Street</Label>
        <Input
          type="text"
          id="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="city">City</Label>
        <Input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="state">State</Label>
        <Input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="zip">Zip Code</Label>
        <Input
          type="text"
          id="zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="photo_id">Photo ID</Label>
        <Input
          type="text"
          id="photo_id"
          value={photo_id}
          onChange={(e) => setPhoto_id(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          type="text"
          id="image_url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </FormField>
      <FormField>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </FormField>
      <FormField>
        <Button type="submit" disabled={isLoading}>
          Sign Up
        </Button>
      </FormField>
      {/* {errors.map((error) => (
        <Error key={error}>{error}</Error>
      ))} */}
    </form>
  );
}

export default SignUpForm;

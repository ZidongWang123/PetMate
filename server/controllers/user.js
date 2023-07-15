import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import User from "../models/user.js";
import articles from "../models/article.js";
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    //Limit the validity of the JWT to 1 hour
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12).catch((error) => {
      console.log(error);
      throw new Error("Error hashing password");
    });

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    //Limit the validity of the JWT to 1 hour
    const token = jwt.sign({ email: res.email, id: result._id }, "test", {
      expiresIn: "24h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const getPersonalInfo=async (req,res)=>{

  const userId = req.params.userId;
  try{
    const result = await User.findById(userId).exec();
    if (result) {
      res.status(200).json({result, message: 'personal info got' });
    } else {
      res.status(404).json({ message: 'user not found' });
    }

  }catch(error){
    res.status(500).json({ message: 'Failed to get personal infomation' });
  }
}

export const modifyPersonalInfo=async(req,res)=>{
  const userId = req.params.userId;
  const updatedInfo = req.body;
  try{
    await User.findByIdAndUpdate(userId, updatedInfo)
    res.status(200).json({ message: 'successfully updated'} )

  }catch(error){
    res.status(500).json({ message: 'Failed to update personal information' });
  }
}



export const getArticles=async(req, res)=>{

  const {userId}=req.params
  const query={"u_id": userId}
  

  try{
    const articlesResulet = await articles.find(query).populate('g_id', 'groupName').populate('u_id', 'name')
    res.status(200).json(articlesResulet);

  }catch(error){
    res.status(500).json({ message: 'Failed to update personal information' });
  }

  
}
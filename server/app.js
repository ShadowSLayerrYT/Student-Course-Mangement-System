const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Configuration (MongoDB)
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Define roles
const ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ADMIN: 'admin'
};

// Middleware to check user role
function checkRole(role) {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === role) {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
}


// TESTING
app.get('/klef/test', async function(req, res){
    res.json("Koneru Lakshmaiah Education Foundation");
});

// REGISTRATION MODULE
app.post('/registration/signup', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const users = db.collection('users');
        const data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN MODULE
app.post('/login/signin', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const users = db.collection('users');
        const data = await users.count(req.body);
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// HOME MODULE
app.post('/uname', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const users = db.collection('users');
        const data = await users.find(req.body, { projection: { firstname: true, lastname: true } }).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP host
    port: 465,
    secure: true, // True for 465, false for other ports
    auth: {
        user: 'electricshockcoc@gmail.com', // Your email address
        pass: 'iamvpecrzggqmgkb' // Your email password
    }
});


// Function to generate OTP
function generateOTP() {
    return otpGenerator.generate(6, { upperCase: false, specialChars: false });
}

// Function to send OTP to the user's email
async function sendOTP(email, otp) {
    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Your Name" <electricshockcoc@gmail.com>',
            to: email,
            subject: 'OTP for Password Reset',
            text: `Your OTP is: ${otp}`,
            html: `<p>Your OTP is: <strong>${otp}</strong></p>`
        });
        console.log('OTP sent to %s', email);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Forgot Password Route
app.post('/login/forgotpassword', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const users = db.collection('users');
        const { email } = req.body;
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email address not found" });
        }
        const otp = generateOTP();
        await users.updateOne({ email }, { $set: { otp } });
        await sendOTP(email, otp);
        conn.close();
        res.json({ message: "OTP sent to your email address" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// HOME MENU
app.post('/home/menu', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const menu = db.collection('menu');
        const data = await menu.find({}).sort({mid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// HOME MENUS
app.post('/home/menus', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const menus = db.collection('menus');
        const data = await menus.find(req.body).sort({smid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Faculty Menu
app.post('/fmenu', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const fmenu = db.collection('fmenu'); 
        const data = await fmenu.find({}).sort({mid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Faculty Menus
app.post('/fmenus', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const fmenus = db.collection('fmenus'); // Assuming 'fmenus' is the collection name for faculty submenus
        const data = await fmenus.find(req.body).sort({smid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Admin Menu
app.post('/amenu', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const amenu = db.collection('amenu'); // Assuming 'amenu' is the collection name for admin menu items
        const data = await amenu.find({}).sort({mid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Menus
app.post('/amenus', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const amenus = db.collection('amenus'); // Assuming 'amenus' is the collection name for admin submenus
        const data = await amenus.find(req.body).sort({smid: 1}).toArray();
        conn.close();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// CHANGE PASSWORD
app.post('/cp/updatepwd', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const users = db.collection('users');
        const data = await users.updateOne({ emailid: req.body.emailid }, { $set: { pwd: req.body.pwd }});
        conn.close();
        res.json("Password has been updated");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADD COURSE
app.post('/book/addnewcourse', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const courses = db.collection('addnewcourse');
        const data = await courses.insertOne(req.body);
        conn.close();
        res.json("Course added successfully...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MY PROFILE
app.post('/myprofile/info', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const users = db.collection('users');
        const userData = await users.findOne({ emailid: req.body.emailid });
        conn.close();
        
        if (userData) {
            res.json([userData]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// VIEW COURSES
app.get('/viewcourses', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const courses = db.collection('addnewcourse');
        const courseData = await courses.find().toArray();
        conn.close();

        if (courseData.length > 0) {
            res.json(courseData);
        } else {
            res.status(404).json({ error: 'No courses found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// routes for different roles

// Faculty 
app.post('/faculty', checkRole(ROLES.FACULTY), async function (req, res) {
    try {
        // Logic specific to faculty 
        res.json({ message: 'Welcome to Faculty ' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin 
app.post('/admin', checkRole(ROLES.ADMIN), async function (req, res) {
    try {
        // Logic specific to admin page
        res.json({ message: 'Welcome to Admin ' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ADD COURSE(student for fetching)

app.get('/coursenames', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const courses = db.collection('addnewcourse');
        const courseData = await courses.find({}, { projection: { _id: 0, courseName: 1, sectionNumber: 1, facultyName: 1, semester: 1, year: 1,description:1 } }).toArray();
        conn.close();

        if (courseData.length > 0) {
            res.json(courseData);
        } else {
            res.status(404).json({ error: 'No courses found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//posting add course of student to database 

app.post('/addcourse', async function(req, res){
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const courses = db.collection('addcourse');
        const data = await courses.insertOne(req.body);
        conn.close();
        res.json("Course added successfully...");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE COURSE
app.delete('/deletecourse', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const courses = db.collection('addnewcourse');
        const { courseName } = req.body;
        const result = await courses.deleteOne({ courseName: courseName });
        conn.close();

        if (result.deletedCount > 0) {
            res.json({ message: 'Course deleted successfully' });
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//view student selected courses
app.get('/studentcourse', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const courses = db.collection('addcourse');
        const courseData = await courses.find().toArray();
        conn.close();

        if (courseData.length > 0) {
            res.json(courseData);
        } else {
            res.status(404).json({ error: 'No courses found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// VIEW STUDENTS
app.get('/viewstudents', async (req, res) => {
    try {
      const conn = await client.connect();
      const db = conn.db('MSWDPro');
      const users = db.collection('users');
      const studentData = await users.find({ role: 'student' }).toArray();
      conn.close();
      res.json(studentData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.get('/viewfaculty', async (req, res) => {
    try {
      const conn = await client.connect();
      const db = conn.db('MSWDPro');
      const users = db.collection('users');
      const facultyData = await users.find({ role: 'faculty' }).toArray();
      conn.close();
      res.json(facultyData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

app.delete('/deletefaculty', checkRole(ROLES.FACULTY), async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const users = db.collection('users');
        const { firstname } = req.body;

        console.log('Attempting to delete faculty with firstname:', firstname);

        const result = await users.deleteOne({ firstname: firstname, role: 'faculty' });

        conn.close();

        if (result.deletedCount > 0) {
            console.log('Faculty deleted successfully');
            res.json({ message: 'Faculty deleted successfully' });
        } else {
            console.log('Faculty not found');
            res.status(404).json({ error: 'Faculty not found' });
        }
    } catch (err) {
        console.error('Error deleting faculty:', err);
        res.status(500).json({ error: err.message });
    }
});


const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../src/uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

app.post('/submitAssignment', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json("File not found");
        }

        const { courseName } = req.body;
        const fileName = req.file.originalname;
        const filePath = `uploads/${fileName}`; 
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const submissions = db.collection('submissions');
        const result = await submissions.insertOne({ courseName, fileName, filePath });
        conn.close();

        if (result.insertedCount === 1) {
            res.status(200).json("Assignment submitted successfully");
        } else {
            res.status(500).json("Failed to submit assignment");
        }
    } catch (error) {
        console.error("Error submitting assignment:", error);
        res.status(500).json(error.message);
    }
});

// Retrieve student submissions
app.get('/submissions', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const submissions = db.collection('submissions');
        const submissionData = await submissions.find().toArray();
        conn.close();

        if (submissionData.length > 0) {
            res.json(submissionData);
        } else {
            res.status(404).json({ error: 'No submissions found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/submitAttendance', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('MSWDPro');
        const attendanceCollection = db.collection('attendance');
        const attendanceDocument = {
            courseName: req.body.courseName, // Include the course name in the document
            date: req.body.date,
            presentStudents: req.body.presentStudents.map(student => ({
                emailid: student.emailid,
                studentName: student.studentName,
                attendance: student.present ? 'present' : 'absent'
            }))
        };

        const result = await attendanceCollection.insertOne(attendanceDocument);

        if (result.insertedCount === 1) {
            res.status(200).json({ message: 'Attendance submitted successfully' });
        } else {
            res.status(200).json({ message: 'Failed to submit attendance' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        await client.close();
    }
});

app.get('/viewAttendance', async (req, res) => {
    try {
        const conn = await client.connect();
        const db = conn.db('MSWDPro');
        const attendanceCollection = db.collection('attendance');
        const attendanceData = await attendanceCollection.find().toArray();

        // Fetching course names and creating a map for quick lookup
        const courseCollection = db.collection('addnewcourse');
        const courseData = await courseCollection.find().toArray();
        const courseMap = {};
        courseData.forEach(course => {
            courseMap[course.courseName] = course.courseName;
        });

        console.log('Course Map:', courseMap); // Log course map

        // Associating course names with attendance data
        attendanceData.forEach(attendance => {
            console.log('Attendance Course Name:', attendance.courseName); // Log attendance course name
            attendance.presentStudents = attendance.presentStudents.filter(student => student.attendance === 'present').map(student => {
                const studentInfo = { studentName: student.studentName };
                return studentInfo;
            });
        });

        console.log('Attendance Data:', attendanceData); // Log attendance data

        res.json(attendanceData);
    } catch (err) {
        console.error('Error fetching attendance data:', err);
        res.status(500).json({ error: err.message });
    } finally {
        await client.close();
    }
});

app.post('/notices', (req, res) => {
    const { notice } = req.body;
    const newNotice = {
      id: notices.length + 1,
      content: notice,
      sender: 'faculty', // Marking the sender as 'faculty'
    };
    notices.push(newNotice);
    res.status(201).json(newNotice);
  });
  
  // Students can view notices
  app.get('/student/notices', (req, res) => {
    // Filter out notices sent by faculty
    const studentNotices = notices.filter(notice => notice.sender !== 'faculty');
    res.json(studentNotices);
  });
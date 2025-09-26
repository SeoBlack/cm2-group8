##SELF ASSISMANTS:

# Backend Code Self-Assessment - Soreen

## Example 1: Improving Error Handling in Job Controllers

Initially, our job controllers had basic error handling but lacked proper validation and specific error responses. Here's the original implementation:

```javascript
// controllers/jobControllers.js
async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
```

The endpoint worked for valid ObjectIds but failed when:

- Invalid ObjectId format was provided (e.g., "invalid-id")
- Job with valid ObjectId didn't exist
- Database connection issues occurred

To address these issues, we refactored the code to handle edge cases effectively:

```javascript
// controllers/jobControllers.js
async function getJobById(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid job ID format" });
    }
    res.status(500).json({ message: error.message });
  }
}
```

**Key Improvements:**

- **Null Check**: Added explicit check for job existence before returning response
- **Specific Error Handling**: Differentiated between CastError (invalid ID format) and other errors
- **Proper HTTP Status Codes**: Used 404 for not found, 400 for bad request, 500 for server errors

## Example 2: Improving Data Type Consistency

Our job model had inconsistent data typing for the salary field. Here's the original implementation:

```javascript
// models/jobModel.js
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true }, // Should be Number for calculations
  company: { type: companySchema, required: true },
});
```

The salary field was stored as String, which caused issues when:

- Performing salary range queries
- Sorting jobs by salary
- Mathematical operations on salary values

**Solution:**
We updated the schema to use the correct data type:

```javascript
// models/jobModel.js
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, required: true, min: 0 }, // Changed to Number with validation
  company: { type: companySchema, required: true },
});
```

**Key Improvements:**

- **Data Type Consistency**: Changed salary from String to Number for proper mathematical operations
- **Validation**: Added minimum value validation to prevent negative salaries
- **Query Performance**: Number fields are more efficient for range queries and sorting

# React Jobs Project

## Usage

### Mock Server

1. Open a terminal in the `backend/api-fake-server` directory

2. Install Dependencies

```bash
npm install
```

3. Start the JSON-Server

```bash
npm run dev
```

4. The server will run on http://localhost:8000

### Frontend-simplified and/or Frontend

1. Open another terminal in the `frontend` directory (or `frontend-simplified`)

2. Install Dependencies

```bash
npm install
```

3. Start the App

```bash
npm run dev
```

React will run on http://localhost:3000

### Api Server

1. Open another terminal in the `backend/api-server-starter` directory

2. Install Dependencies

```bash
npm install
```

3. Start the Server

```bash
npm run dev
```

4. The server will run on http://localhost:4000

---

## Other

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### About

This is the jobs listing project based on the [YouTube crash course](https://youtu.be/LDB4uaJ87e0).

<img src="./frontend/public/screen.png" />

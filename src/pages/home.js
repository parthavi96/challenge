import React,{ useState, useEffect } from 'react';
import "./home.css"

function Home() {

    useEffect(() => {
        fetchItems();
    }, []);

    const[loc,setloc] = useState("");
    const[jobt,setjobt] = useState("");
    const[skillreq,setskillreq] = useState("");
    const[items,setItems] = useState([]);
    // const [skill,setSkill] = useState([]);

    const fetchItems = async () => {
        const data = await fetch(
            "https://divercity-test.herokuapp.com/jobs"
        );
        const items = await data.json();
        console.log(items.jobs);
        setItems(items.jobs);
        
        // setSkill(items.jobs.skills_tag)
        const skill = items.jobs.skills_tag
    }
    const payload = {
        motivation:"I really want the job",
        cover_letter:"I am a good person"
    }
    
    const formData = new URLSearchParams();
    formData.append("motivation","I really want the job");
    formData.append("cover_letter","I am a good person");

    const jobApply = async () => {
        const applydata = await fetch("https://divercity-test.herokuapp.com/jobs/2/apply?motivation=I really want the job&cover_letter=I am a good person", {
            headers: {
              Authorization: "Shh secret token",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: formData.toString(),
            json:true,
          })
          .then(res=>res.json())
            .then((data)=>{
                console.log(data);
                alert(data.message);
            },
            (error) => {
                console.log(error);
            }
            )
    }

  return (
    <div className="jobList">
        <h1>Jobs Available</h1>
        <label>Location</label>
        <select className="ddCss custom-select" onChange={(e)=>{
            const selectedLoc=e.target.value;
            setloc(selectedLoc);
        }}>
        {items.map(item => (
            <option
            key={item.location}
            value={item.location}
            >
            {item.location}
            </option>
        ))}
        </select>
        <label>Job Type</label>
        <select className="ddCss custom-select" onChange={(e)=>{
            const selectedJob=e.target.value;
            setjobt(selectedJob)
        }}>
        {items.map(item => (
            <option
            key={item.job_type}
            value={item.job_type}
            >
            {item.job_type}
            </option>
        ))}
        </select>
        <label>Skill</label>
        <select className="ddCss custom-select" onChange={(e)=>{
            const selectedsk=e.target.value;
            setskillreq(selectedsk)
        }}>
        {items.map(item => (
            <option
            key={item.skills_tag}
            value={item.skills_tag}
            >
            {item.skills_tag}
            </option>
        ))}
        </select>
        <ul className="SG">
        {items.filter((item) =>{
            if (loc == "" && jobt == "" && skillreq == "") {
                return item
            } else if (item.location == loc || item.job_type == jobt || item.skills_tag == skillreq) {
                return item
            } 
        }).map(item =>(
            <li className="sgLi">
                <div className="box">
                <h3 key={item.id}>{item.title}</h3>
                <button className="btncss" onClick={jobApply}>Apply</button>
                <h5 onChange={(e) => setskillreq(e.target.value)}>Location - {item.location}</h5>
                <p>Job type - {item.job_type}</p>
                <p>Skills required - {item.skills_tag}</p>
                <p>{item.description}</p>
                </div>
            </li>
        ))}
        </ul>
    </div>
  );
}

export default Home;

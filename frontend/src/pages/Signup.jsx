import api from "../api/axios"
import Input from "../components/Input"

const Signup = () => {

    const handleSumit = async(e)=>{
        e.prevenDefault()
        const form  = new FormData(e.target)
        const data = {
            email:form.get("email"),
            password:form.get("password")


        }

        try {
            await api.post("/auth/signup",data)    
            alert("Signup successfull ")   
        } catch (error) {
            alert(err.response?.data?.detail || "Signup failed")

        }
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSumit}
        className="bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <Input name="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />

        <button className="w-full bg-black text-white py-2 mt-4 rounded">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default Signup
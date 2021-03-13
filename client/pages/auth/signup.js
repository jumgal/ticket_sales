import React, { useState } from 'react';
import Router from 'next/router'
import useRequest from '../../hooks/use-request';

const signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    });

    const handleSignupForm = async e => {

        e.preventDefault()
        doRequest()

        setEmail('')
        setPassword('')

    }

    //     const response = await axios.post('/api/users/signup', {
    //         email,
    //         password
    //     })

    //     setEmail('');
    //     setPassword('')

    //     console.log(response.data)


    // } catch (err) {

    //     console.log(err.response.data)
    //     setErrors(err.response.data.errors)
    // }



    return (
        <div className="container">
            <form onSubmit={handleSignupForm}>
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                {errors}

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}


export default signup;
import React,{Component} from 'react';

export default class App extends Component
{
	state={
		a:[],
		ob1:{name:"",email:""},
		ob2:{id:0,name:"",email:""},
	}
	insert(e)
	{
		e.preventDefault()
		this.setState({
			a:[...this.state.a,{id:this.state.a.length+1,name:this.state.ob1.name,email:this.state.ob1.email}],

			ob1:{name:"",email:""}
		})
	}
	update(e)
	{
		e.preventDefault()
		this.setState({
			a:this.state.a.map(x=>(x.id===this.state.ob2.id)?(this.state.ob2):(x)),
			ob2:{id:0,name:"",email:""}
		})
	}

	input(col1,e)
	{
		let s=this.state
		let col2=e.target.name
		let val=e.target.value
		s[col1][col2]=val
		this.setState(s)
	}
	
	edit(x)
	{
		this.setState({ob2:x})
	}
	del(id)
	{
		this.setState({a:this.state.a.filter(x=>x.id!==id)})
	}	
	render()
	{
		let {a,ob1,ob2}=this.state
		return (
				<div>
					<form onSubmit={this.insert.bind(this)}>
						<h3>new record</h3>
						<input onChange={this.input.bind(this,"ob1")} name="name" placeholder="name" value={ob1.name} /> 
						<input onChange={this.input.bind(this,"ob1")} name="email" placeholder="email" value={ob1.email} /> 
						<button>insert</button>
					</form>
					{ob2.id>0?<form onSubmit={this.update.bind(this)}>
						<h3>edit record {ob2.id}</h3>
						<input onChange={this.input.bind(this,"ob2")} name="name" placeholder="name" value={ob2.name} /> 
						<input onChange={this.input.bind(this,"ob2")} name="email" placeholder="email" value={ob2.email} /> 
						<button>update</button>
					</form>:null}
					<h1>All record {a.length}</h1>
					<table>
						<thead>
							<tr>
								<th>id</th>
								<th>name</th>
								<th>email</th>
								<th>actions</th>
							</tr>
						</thead>
						<tbody>
							{a.map(x=>
								<tr key={x.id}>
									<td>{x.id}</td>
									<td>{x.name}</td>
									<td>{x.email}</td>
									<td>
										<button onClick={this.edit.bind(this,x)}>edit</button>
										<button onClick={this.del.bind(this,x.id)}>del</button>
									</td>
								</tr>
								
							)}
						</tbody>
					</table>
				</div>
			)
	}
}
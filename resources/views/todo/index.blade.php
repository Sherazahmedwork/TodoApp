@extends('layout.app')
@section('contents')
		
	<div class="container-fluid my-4" >
		<div class="card shadow" style="min-height:90vh ">
			<div class="card-header">
				Todo List
				<a href="{{ route('todo.create') }}" class="btn btn-sm btn-dark float-right">Add</a>
			</div>
			<div class="card-body ">

				@unless ($todos->count())
					<div class="alert alert-danger">No data found in system</div>
				@endunless

		    	<div class="row">

		    		@foreach ($todos as $todo)
					<div class="col-lg-4 col-md-6  ">

						<div class="card shadow mb-4">
				  			<div class="card-header">
				  				{{ $todo->name }}

								<span class="badge float-right rounded-0 badge-dark">{{ $todo->status }}</span>
				  				<span class="badge float-right rounded-0 badge-info mx-1">{{ $todo->priority }}</span>
				  				
				  			</div>
					  		<div class="card-body">
			  					<table class="table  text-muted table-sm table-borderless">
			  						<tr><td>Due Date: </td> <td>{{ $todo->due_date }}</td><tr>
			  						<tr><td>Author: </td> <td>{{ $todo->due_date }}</td><tr>
			  						<tr><td>Created at: </td> <td>{{ $todo->created_at }}</td><tr>
			  						<tr><td>Updated at: </td> <td>{{ $todo->updated_at }}</td><tr>
			  					</table>

					  		</div>
					  		<div class="card-footer p-1">
					  			<button
						  				data-url="{{ route('todo.destroy',$todo->id) }}"
						  				class="btn btn-sm deleteRequest--btn btn-outline-danger mx-1 float-right "
						  			>Delete</button>

						  			<a
						  				href="{{ route('todo.edit',$todo->id) }}"
						  				class="btn btn-sm btn-outline-info float-right"
						  			>Edit</a>
					  		</div>
				  		</div>

					</div>
		    		@endforeach

				</div>

			</div>
		</div>	
	</div>

@endsection
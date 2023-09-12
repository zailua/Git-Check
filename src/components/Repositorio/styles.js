import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
	max-width: 700px;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	padding: 30px;
	margin: 80px auto;
	h1{
		font-size: 30px;
		text-align: center;
		color: #ffb7c5;	
		margin-top: 20px;
	}
`

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		width: 150px;
		border-radius: 20%;
		margin-top: 20px 0;
	}

	h1 {
		font-size: 30px;
		text-transform: capitalize;
		color: #ffb7c5;
	}
	p {
		margin-top: 5px;
		font-size: 14px;
		color: #000;
		text-align: center;
		line-height: 1.4;
		max-width: fit-content;
	}
`

export const Loading = styled.div`
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

export const Back = styled(Link)`
	background: transparent;
	border: 0;
`

export const IssuesList = styled.ul`
	list-style: none;
	padding-top: 30px;
	margin-top: 30px;
	border-top: 1px solid #eee;

	li {
		display: flex;
		padding: 15px 10px;
		
		

		& + li {
			margin-top: 12px;
		}

		img {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
		}
		div {
			flex: 1;
			margin-left: 12px;

			p{
				margin-top: 10px;
				font-size: 12px;
				color: #000;
			}
		}

		strong {
			font-size: 15px;
			

			a {
				text-decoration: none;
				color: #333;
				transition: 0.5;

				&:hover {
					color: #ffb7c5;
				}
			}

			span{
			 	background: #ff2;
				color: #fff; 
				border-radius: 4px;
				font-size: 12px;
				font-weight: 600;
				padding: 5px 7px;
				margin-left: 10px;
				

			}
		}
	}
`

export const PageButton = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

button{
	background: #ffb7c5;
	border: 0;
	padding: 0 15px;
	border-radius: 4px;
	height: 40px;
	font-weight: 600;
	cursor: pointer;

	&:disabled{
		cursor: not-allowed;
		opacity: 0.5;
		
	}
}
`
export const FilterList = styled.div`
margin: 15px 0;

button{
	outline: auto;
	border: 0;
	padding: 8px;
	border-radius: 4px;
	margin: 0 3px;
}

&:nth-child(${props => props.active + 1}){
	background: #ffb7c5;
	color: #fff;
}

`
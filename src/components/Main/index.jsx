import { useCallback, useEffect, useState } from 'react'
import { FaBars, FaGithub, FaPlus, FaReact, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Container, DeleteButton, Form, List, SubmitButton } from './styles'

export default function Main() {
	const [newRepo, setNewRepo] = useState('')
	const [repos, setRepos] = useState([])
	const [loading, setLoading] = useState(false)
	const [alert, setAlert] = useState(false)

	useEffect(() => {
		const repoStorage = localStorage.getItem('storage')
		if (repoStorage) {
			setRepos(JSON.parse(repoStorage))
		}
	}, [])

	useEffect(() => {
		if (repos.length !== 0) {
			localStorage.setItem('storage', JSON.stringify(repos))
		}
	}, [repos])

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault()
			async function submit() {
				setLoading(true)
				try {
					if (newRepo === '') {
						throw new Error('Please insert a valid repository')
					}

					const response = await api.get(`/repos/${newRepo}`)
					const data = {
						name: response.data.full_name,
					}
					const hasRepo = repos.find((repo) => repo.name.includes(newRepo))
					if (hasRepo) {
						throw new Error('Repository duplicated')
					}

					setRepos((prevRepos) => [...prevRepos, data])
					setNewRepo('')
				} catch (err) {
					setAlert(true)
					console.error(err)
				} finally {
					setLoading(false)
				}
			}
			submit().catch((err) => console.error(err))
		},
		[newRepo, repos],
	)
	function handleInputChange(e) {
		setNewRepo(e.target.value)
		setAlert(false)
	}

	const handleDelete = useCallback(
		(repo) => {
			const find = repos.filter((r) => r.name !== repo)
			setRepos(find)
			console.log(find)
		},
		[repos],
	)

	return (
		<Container>
			<h1>
				<FaGithub size={25} /> Meus Repositorios
			</h1>
			<Form onSubmit={handleSubmit} alert={alert ? 1 : 0}>
				<input
					onChange={handleInputChange}
					value={newRepo}
					type="text"
					placeholder="Adicionar Repositorio"
				/>

				<SubmitButton loading={loading ? 1 : 0}>
					{loading ? (
						<FaReact color="#FFF" size={16} />
					) : (
						<FaPlus color="#FFF" size={14} />
					)}
				</SubmitButton>
			</Form>
			<List>
				{repos.map((repo) => (
					<li key={repo.name}>
						<span>
							<DeleteButton onClick={() => handleDelete(repo.name)}>
								<FaTrash size={14} />
							</DeleteButton>
							{repo.name}
						</span>
						<Link to={`/repository/${encodeURIComponent(repo.name)}`}>
							<FaBars size={20} />
						</Link>
					</li>
				))}
			</List>
		</Container>
	)
}

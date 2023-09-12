/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import {
	Back,
	Container,
	FilterList,
	IssuesList,
	Loading,
	Owner,
	PageButton,
} from './styles'

export default function Repositorio() {
	const { repository } = useParams()
	const [repo, setRepo] = useState({})
	const [issues, setIssues] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [filters] = useState([
		{
			state: 'all',
			label: 'Todas',
			active: true,
		},
		{ state: 'open', label: 'Abertas', active: false },
		{
			state: 'closed',
			label: 'Fechadas',
			active: false,
		},
	])
	const [filterIndex, setFilterIndex] = useState(0)

	useEffect(() => {
		async function load() {
			const [reposData, issuesData] = await Promise.all([
				api.get(`/repos/${repository}`),
				api.get(`/repos/${repository}/issues`, {
					params: {
						state: filters.find(f => f.active).state,
						per_page: 5,
					},
				}),
			])
			setRepo(reposData.data)
			setIssues(issuesData.data)
			setLoading(false)

			console.log(reposData.data, issuesData.data)
		}
		load().catch((error) => console.error(error))
	}, [repository, filters])

	useEffect(() => {
		async function loadIssues() {
			const issues = await api.get(`/repos/${repository}/issues`, {
				params: {
					state: filters[filterIndex].state,
					page,
					per_page: 5,
				},
			})

			setIssues(issues.data)
		}
		loadIssues().catch((err) => console.error(err))
	}, [page, repository, filters, filterIndex])

	function handlePage(action) {
		setPage(action === 'back' ? page - 1 : page + 1)
	}

	function handleFilter(index) {
		setFilterIndex(index)
	}

	if (loading) {
		return (
			<Loading>
				<h1>Carregando...</h1>
			</Loading>
		)
	}

	return (
		<Container>
			<Back to="/">
				<FaArrowLeft size={30} color="#ffb7c5" />
			</Back>
			<Owner>
				<img src={repo.owner.avatar_url} alt={repo.owner.login} />
				<h1>{repo.name}</h1>
				<p>{repo.description}</p>
			</Owner>
			<FilterList active={filterIndex}>
				{filters.map((filter, index) => (
					<button type="button" key={filter.label} onClick={() => handleFilter(index)}>{filter.label}</button>
				))}
			</FilterList>
			{issues.length === 0 ? (
				<h1>No Issues</h1>
			) : (
				<IssuesList>
					{issues.map((issue) => (
						<li key={String(issue.id)}>
							<img src={issue.user.avatar_url} alt={issue.user.login} />
							<div>
								<strong>
									<a href={issue.html_url}>{issue.title}</a>
									{issue.labels.map((label) => (
										<span
											style={{ background: `#${label.color}` }}
											key={String(label.id)}
										>
											{label.name}
										</span>
									))}
								</strong>
								<p>{issue.user.login}</p>
							</div>
						</li>
					))}
				</IssuesList>
			)}
			<PageButton>
				<button
					type="button"
					disabled={page < 2}
					onClick={() => handlePage('back')}
				>
					Anterior
				</button>
				<button
					type="button"
					disabled={issues.length === 0}
					onClick={() => handlePage('next')}
				>
					Proxima
				</button>
			</PageButton>
		</Container>
	)
}

import { inject, observer } from "mobx-react"
import React from "react"
import { Helmet } from "react-helmet"
import { Link, useHistory } from "react-router-dom"
import { Footer, Header } from "../Components"
import PortfolioStores from "../stores/portfolioStores"
import { IPortfolio } from "../Types"

import "./styles/portfolio.scss"

interface IPortfolioProps {
	portfolioStores?: PortfolioStores
	view?: boolean
}
const Portfolio: React.FC<IPortfolioProps> = inject("portfolioStores")(
	observer(
		({ portfolioStores, view }): React.ReactElement => {
			const history = useHistory()
			const portfolio: IPortfolio[] = portfolioStores!.getPortfolioInfo
			const [port, setPort] = React.useState<string>("")
			const openPortfolio = portfolio.filter((item) => item.title === port)
			const handleClose = (): void => {
				history.push("/portfolio")
				window.scrollTo(0, 0)
				setPort("")
			}
			return (
				<>
					{!view && (
						<>
							<Helmet>
								<title>Портфолио - ITD Company</title>
								<meta name='description' content='Страница сайта - Портфолио' />
							</Helmet>
							<Header />
							<section className='portfolio_cases_screen'>
								<div className='wrapper'>
									<div className='portfolio_cases_container'>
										<div style={{ width: "100%" }}>
											<div className='gradient_title'>
												<h2>Портфолио</h2>
											</div>
										</div>
										{portfolio &&
											portfolio.map((item, index) => (
												<article
													key={index + Date.now()}
													style={{ background: `url(${item.prev})` }}
													onClick={() => {
														setPort(item.title!)
														window.scrollTo(0, 0)
													}}>
													<Link to={`/portfolio/${item.title}`}>
														<div className='case_number'>
															{index + 1 <= 9 ? "0" : ""}
															{index + 1}
														</div>
														<div className='portfolio_description_container'>
															<h4 className='portfolio_case_title'>
																{item.title}
															</h4>
															<div className='description'>{item.desc}</div>
														</div>
													</Link>
												</article>
											))}
									</div>
								</div>
							</section>
							<Footer />
						</>
					)}
					{view && (
						<>
							<Helmet>
								<title>{openPortfolio[0].title} - ITD Company</title>
								<meta name='description' content='Страница сайта - Портфолио' />
							</Helmet>
							<section className='portfolio_form'>
								<img
									src='../../img/close_form.png'
									alt=''
									id='close_portfolio_form'
									onClick={() => handleClose()}
								/>
								{openPortfolio &&
									openPortfolio.map((item) => (
										<React.Fragment key={item.title}>
											<button id='go_to_site'>
												<a href={item.link}>Website</a>
											</button>
											<div className='portfolio_form_container'>
												<img
													key={item.title}
													src={`${item.proj}`}
													alt={item.title}
												/>
											</div>
										</React.Fragment>
									))}
								<Footer />
							</section>
						</>
					)}
				</>
			)
		},
	),
)

export default Portfolio

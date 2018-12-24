import React from 'react';
import PropTypes from 'prop-types';

import {
	Accordion,
	AccordionItem,
	AccordionItemTitle,
	AccordionItemBody,
} from 'react-accessible-accordion';

const Collapsable = (props) => {
	const {
		invert,
		title,
		children,
	} = props;
	return (
		<div className="collapsable">
			<Accordion>
				<AccordionItem>
					<AccordionItemTitle>
						<button type="button" className={invert ? 'invert' : ''}>
							{title}
						</button>
					</AccordionItemTitle>
					<AccordionItemBody>
						{children}
					</AccordionItemBody>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

Collapsable.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	invert: PropTypes.bool.isRequired,
};

export default Collapsable;

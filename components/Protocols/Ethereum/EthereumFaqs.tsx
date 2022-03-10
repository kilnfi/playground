import React from 'react';
import Accordion from "../../UI/Accordion";

const FAQS = [
  {
    question: "What happens to my ETH when I stake it?",
    answer: <p>Your ETH is deposited into the <a
      href='https://etherscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa' target='_blank' rel='noreferrer'>ETH2
      deposit contract</a>, and associated with a validation key that SkillZ generates for you. This validation key is
      then used to instantiate a validator deployed on SkillZ infrastructure. The validator performs on-chain duties on
      the Ethereum Beacon Chain, namely attestations and block proposals. For this activity rewards are earned and
      accrue to your withdrawal wallet.</p>,
  },
  {
    question: "Who can withdraw the staked ETH?",
    answer: <p>Only the wallet you use to issue your deposit can be used to withdraw your stake, and accrued rewards.
      SkillZ or any other party cannot do that.<br/> <span className="text-red-400">This means you must ensure you retain control of the wallet you use to deposit your stake.</span>
    </p>,
  },
  {
    question: "When can I withdraw the staked ETH?",
    answer: <p>Withdrawals are currently planned to be enabled about 6 months after The Merge, in the first major update
      following it. This is expected to be at the end of 2022 at the earliest. When they are enabled, there may be
      delays to withdraw ETH. Please note that these timelines are not commitments and are not in the control of SkillZ.
      Staking should be seen as a long-term investment.</p>,
  },
  {
    question: "What are the rewards associated with staking?",
    answer: <p>Today, ETH staking rewards stem from supply issuance: new ETH is generated and granted to stakers, at a
      rate of around 5% of their stake per year (APY). Once the merge happens and the Beacon Chain becomes the mainnet
      Ethereum chain, two additional sources of rewards will go to stakers: part of the transaction fees, and MEV. This
      is expected to at least double the APY. Longer term, as more and more validators join the Beacon Chain, the APY is
      expected to drop down again. For more details, please see <a
      href="https://docs.google.com/spreadsheets/d/1zRUdDq7xZ-GdSBJee0hoZ2YzNEnG9v9Pkna0DTV6TC0/edit#gid=0"
      target="_blank" rel="noreferrer">this model</a> from ETH2 researcher Justin Drake.</p>,
  },
  {
    question: "What are the risks associated with staking?",
    answer: <p>There are two major forms of risk: <br/><br/>
      1) Slashing risk. If a validator misbehaves on the network, for instance double-voting on a transaction, they may
      get “slashing penalties”. This involves burning part of the stake collateral. SkillZ T&Cs fully cover any such
      losses due to its infrastructure, as detailed in the <a href="https://www.skillz.io/terms-conditions/"
        target="_blank" rel="noreferrer">T&Cs</a>.<br/><br/>
      2) Protocol risk. If there is a protocol-level failure such as the Merge does not happen, a smart-contract hack in
      the deposit contract, or other such event, SkillZ does not cover it and is not responsible. By staking you are
      confident in the Ethereum network security and roadmap, and you understand and accept this risk.
    </p>
  },
  {
    question: "What are the SLAs, pricing, and invoicing details of this SkillZ offering?",
    answer: <p>Please visit the <a href="https://www.skillz.io/terms-conditions/" target="_blank" rel="noreferrer">SkillZ
      T&Cs</a> for this information.</p>,
  },
  {
    question: "Which validator clients does SkillZ run? Where do they run?",
    answer: <p>By default SkillZ runs the Prysm validator client on AWS. We also have the ability to run the Teku
      client.</p>,
  },
  {
    question: "I have another question",
    answer: <p>Please do not hesitate to get in touch. <a href="mailto:support@skillz.io" target="_blank"
      rel="noreferrer">support@skillz.io</a></p>,
  },
];

const EthereumFaqs = () => {
  return (
    <div>
      <h2 className="text-center font-extrabold text-gray-900 text-3xl">Frequently asked questions</h2>
      <Accordion className="mt-6 space-y-6 divide-y divide-gray-200">
        {FAQS.map((faq, index) => (
          <Accordion.Item
            key={`faq-${index}`}
            title={faq.question}
            className="pt-6"
          >
            <div className="text-gray-500">{faq.answer}</div>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default EthereumFaqs;

import React from 'react';
import Accordion from "../../UI/Accordion";
import InfoCard from "../../UI/InfoCard";
import Image from "next/image";
import solFaqsRewards from "../../../public/solana-faqs-rewards.png";

const FAQS = [
  {
    question: "How does staking work on Solana?",
    answer: (
      <p>
        Because Solana is a delegated proof of stake network, <b>delegating your
        SOL to a validator</b> (i.e staking it for rewards) is done in a single
        transaction issued from your wallet, which is generated from the Stake
        button on this page.&nbsp;
        <a
          href="https://explorer.solana.com/tx/ZFVv1c32jdLb59kGkthctvbKRcyFYmsbPxKVAJP4RAF8m4aM7ofkyQMLcTDZCQ4Z8gFq6MWkQaj797p2UTyARhh"
          target="_blank"
          rel="noreferrer"
        >
          Here
        </a> is an example of such a
        transaction, delegating
        0.5 SOL to the SkillZ validator on mainnet.
      </p>
    ),
  },
  {
    question: "When will I start earning rewards?",
    answer: (
      <p>
        When you decide to stake your SOL, you will need to initially wait
        2&nbsp;
        <a
          href="https://support.exodus.com/article/1551-solana-staking-faq#epoch"
          target="_blank"
          rel="noreferrer"
        >
          epochs
        </a>&nbsp;
        (where 1 epoch is roughly
        equivalent to 2-4 days) to start generating rewards. This means that if
        you start staking your SOL in epoch 100, then you will start earning
        rewards on the <b><i>effective</i></b> amount in epoch 102.<br/><br/>

        Your rewards are distributed every epoch after that.<br/><br/>

        Any additional SOL that you stake after will also need to wait 2 epochs
        before earning rewards on the <b><i>effective</i></b> amount.
      </p>
    ),
  },
  {
    question: "What is the validator address?",
    answer: (
      <>
        <h3 className="mb-2">Mainnet</h3>
        <ul className="mb-5">
          <li>
            Identity: <span
              className="text-blue-500 inline break-all">5pPRHniefFjkiaArbGX3Y8NUysJmQ9tMZg3FrFGwHzSm</span>
          </li>
          <li>
            Vote account:&nbsp;
            <a
              href="https://www.validators.app/vote_accounts/DdCNGDpP7qMgoAy6paFzhhak2EeyCZcgjH7ak5u5v28m?locale=en&network=mainnet"
              className="text-blue-500 inline break-all"
              target="_blank"
              rel="noreferrer"
            >
              DdCNGDpP7qMgoAy6paFzhhak2EeyCZcgjH7ak5u5v28m
            </a>
          </li>
          <li>
            <a
              href="https://www.validators.app/validators/5pPRHniefFjkiaArbGX3Y8NUysJmQ9tMZg3FrFGwHzSm?locale=en&network=mainnet&order=&refresh="
              className="inline break-all"
              target="_blank"
              rel="noreferrer"
            >
              Performance link
            </a>
          </li>
          <li>
            <a
              href="https://solanabeach.io/validator/DdCNGDpP7qMgoAy6paFzhhak2EeyCZcgjH7ak5u5v28m"
              className="inline break-all"
              target="_blank"
              rel="noreferrer"
            >
              Solana Beach link
            </a>
          </li>
          <li>Commission: 8%</li>
        </ul>

        <h3 className="mb-2">Testnet</h3>
        <ul className="mb-5">
          <li>
            Identity:&nbsp;
            <span className="text-blue-500 inline break-all">
              F1jcLYJ1s8k4oYVy51J2RvYGh4sB1kWsUB2NaDrg6ejL
            </span>
          </li>
          <li>
            Vote account:&nbsp;
            <a
              href="https://www.validators.app/vote_accounts/BnG7nNXivdcwVoeuHmE7UL6KUHufJMiqouX6dz22X6LZ?locale=en&network=testnet"
              className="text-blue-500 inline break-all"
              target="_blank"
              rel="noreferrer"
            >
              BnG7nNXivdcwVoeuHmE7UL6KUHufJMiqouX6dz22X6LZ
            </a>
          </li>
          <li>
            <a
              href="https://www.validators.app/validators/F1jcLYJ1s8k4oYVy51J2RvYGh4sB1kWsUB2NaDrg6ejL?locale=en&network=testnet&order=&refresh="
              className="inline break-all"
              target="_blank"
              rel="noreferrer"
            >
              Performance link
            </a>
          </li>
          <li>
            <a
              href="https://solanabeach.io/validator/BnG7nNXivdcwVoeuHmE7UL6KUHufJMiqouX6dz22X6LZ?cluster=testnet"
              className="inline break-all"
              target="_blank"
              rel="noreferrer"
            >
              Solana Beach link
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "What are the SLAs?",
    answer: (
      <>
        <InfoCard className="mb-5">
          <p className="text-sm">
            The full SLAs can be found in the broader SkillZ services terms &
            conditions available&nbsp;
            <a
              href="https://www.skillz.io/terms-conditions/"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>,
            which you contractually engage on when you
            sign an order form for a SkillZ service.
          </p>
        </InfoCard>

        <h3 className="mb-4">Guaranteed rewards</h3>
        <ul className="mb-5">
          <li>
            SkillZ guarantees 99% of achievable staking rewards. 
          </li>
        </ul>

        <h3 className="mb-4">Loss of original stake</h3>
        <ul className="mb-5">
          <li>
            SkillZ will fully cover losses to the original stake that are solely due to its infrastructure or operations. 
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "How do I unstake?",
    answer: (
      <p>
        Currently unstaking is not implemented in this dashboard, however you can unstake from the wallet you used by following their documentation. 
        Note that when you unstake your Solana, you may need to wait several epochs (approx. 2-4 days or more) for the Solana to be available to send or exchange again.
      </p>
    ),
  },
  {
    question: "How is commission paid?",
    answer: (
      <p>
        Each&nbsp;
        <a
          href="https://www.validators.app/"
          target="_blank"
          rel="noreferrer"
        >
          validator commission rate is public
        </a> and the same for all funds on a given validator.

        The validator takes its commission automatically when rewards are
        generated. Your staking rewards are distributed net of the validator
        commission.
      </p>
    ),
  },
  {
    question: "How do I monitor my rewards?",
    answer: (
      <>
        <p className="mb-5">
          You can monitor your rewards by going to the Solana explorer page of
          your Stake Account address (
          <a
            href="https://explorer.solana.com/address/whcXLBXkzzDoNp4TLrJ1wt8qgvnmAncrJUxqJh85wLQ/rewards"
            target="_blank"
            rel="noreferrer"
          >
            example
          </a>
          )
        </p>

        <div className="mb-5">
          <Image
            src={solFaqsRewards}
            quality={100}
            layout="responsive"
            alt="solana rewards"
          />
        </div>

        <p className="mb-5">
          You can also do so using the&nbsp;
          <a
            href="https://docs.skillz.io/api/solana.html#get-stakes-rewards"
            target="_blank"
            rel="noreferrer"
          >
            get stakes rewards API
          </a>.
        </p>
      </>
    ),
  },
];

const SolanaFaqs = () => {
  return (
    <div>
      <h2
        className="text-center font-extrabold text-gray-900 text-3xl">Frequently
        asked questions</h2>
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

export default SolanaFaqs;
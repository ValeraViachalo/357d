import { Content } from "@/utils/Content/Content";

import "./HomePage.scss";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import { AnchorLink } from "@/utils/AnchorLink/AnchorLink";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <main className="home">
      <div className="home_hero">
        <Content
          url="https://images.beta.cosmos.so/4820ce0b-773c-4953-8e4b-d54c9db9718a.mp4"
          className="home_video_bg"
        />
        <h1 className={`super-text home__title`}>RTRTS</h1>
        <ScrollProvider>
          <AnchorLink toSection="#second" className="home_hero_button">
            <p>scroll</p>
          </AnchorLink>
        </ScrollProvider>
      </div>
      <div className={`home_section home_section_1`} id="second">
        <Content url="https://images.beta.cosmos.so/9fb5ca8c-b6cc-4f0e-ba59-02e9507f8161?format=jpeg" />
      </div>
      <ScrollProvider wrapper="#scroll-wrapper"></ScrollProvider>
      <div className="scroll_wrapper">
        <div className="scroll_content" id="scroll-wrapper">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet labore
            facilis maiores nostrum sit, earum ex eum. Veritatis excepturi
            delectus quibusdam quidem, veniam, doloribus ipsum cumque dolor
            magni eius, dicta error dolorem soluta animi quos. Et quasi dolores,
            ratione recusandae aliquam molestiae sed fugiat. Nam facere
            voluptatem et. Unde voluptas cum hic a quidem distinctio nobis!
            Temporibus maxime error quasi perferendis labore libero quaerat aut
            tenetur neque! Alias sequi voluptatibus pariatur possimus dolorem
            veniam facere debitis reiciendis aperiam quia ducimus sunt
            perspiciatis molestias recusandae, culpa explicabo laudantium quas
            reprehenderit commodi odit quo non dolor incidunt quis! Ipsum
            voluptatum soluta corporis recusandae ex sequi nulla doloribus
            molestias voluptate, repudiandae consequuntur libero? Beatae nihil
            deserunt aperiam perferendis esse ab sapiente repellat
            necessitatibus illum consequatur non fugiat earum, molestias
            architecto omnis repudiandae id incidunt impedit. Assumenda porro
            neque autem placeat, unde adipisci consequuntur! Error similique
            sequi eum animi totam saepe, vel molestias cumque aperiam culpa
            harum laudantium, corporis, rerum illo enim expedita distinctio?
            Ratione numquam libero iusto quasi iure eius maxime ipsa nemo sit
            ipsam, non quaerat? Laudantium hic fugiat aut labore reiciendis ipsa
            magni vel facere consequuntur nulla, natus ut, eos consequatur ipsam
            accusantium dolore esse saepe? Quis et cupiditate sequi aspernatur
            officia ipsa distinctio similique at culpa velit quasi, minima
            temporibus rem animi nobis voluptate doloremque vitae? Expedita
            optio blanditiis quia incidunt vitae quidem quos inventore
            reprehenderit voluptatibus corporis harum odio temporibus aliquid
            est unde nobis sed minima sequi laborum, officia magni libero velit
            sint mollitia. Hic velit voluptates repellat totam reprehenderit
            atque illum, itaque laudantium reiciendis. Itaque amet adipisci,
            omnis non quibusdam, rem iste ea exercitationem dolor perspiciatis
            sed, porro nihil. Harum dolores, recusandae fugit optio minima sint
            perspiciatis ea, molestias officiis quibusdam excepturi ipsum. Quod
            voluptatem eius perspiciatis minus alias minima voluptas praesentium
            corporis veritatis officiis. Laboriosam quia quam officiis enim
            dolor, accusamus odit dolorum, pariatur necessitatibus rem deserunt!
            Eum incidunt rerum praesentium vel modi excepturi porro omnis
            voluptatibus reprehenderit quia numquam, aut reiciendis possimus.
            Ratione animi quo ipsum tenetur nemo, rem sint, perspiciatis non,
            laborum unde id! Perspiciatis delectus est quis similique optio
            dignissimos earum magni odit blanditiis! Consequatur laudantium
            dolorum autem quis porro tempore vitae harum labore eos minima
            itaque repudiandae exercitationem perferendis aperiam, est
            reprehenderit eveniet necessitatibus perspiciatis maxime dolorem
            voluptas! Voluptatibus eum id tenetur, nulla maiores amet illo
            doloribus placeat. Aut ab cupiditate autem. Iste magni, ducimus
            inventore ut, illo accusantium vero magnam quis, unde debitis
            consectetur cupiditate dolor sapiente. Veritatis ad quibusdam
            repellat laborum optio id. Minus perspiciatis vel consequuntur
            incidunt, inventore quisquam placeat architecto laborum? Fugit
            eveniet, earum necessitatibus ad sed corrupti nulla rem in, veniam
            dolore ipsam est culpa a accusamus sapiente molestiae voluptatibus
            quia vero illum! Nostrum porro similique earum eaque aliquid
            accusamus quidem dolore maxime obcaecati aperiam vel explicabo, fuga
            repudiandae tenetur assumenda delectus voluptatum rerum expedita!
            Soluta voluptate non, eligendi amet ducimus nulla quam minus
            provident? Exercitationem ipsa autem voluptates veritatis officiis
            quas aliquid unde repellendus itaque deleniti blanditiis laudantium
            possimus id inventore et alias magnam dolores, odit corporis.
            Repellat, eaque odit, accusamus, fuga aliquam voluptatibus nulla
            architecto repellendus laudantium necessitatibus possimus. Placeat
            itaque quasi autem est voluptas inventore ad consequatur excepturi
            non. Commodi, dignissimos repudiandae. Minus, accusantium unde quos
            porro obcaecati ipsam dicta aspernatur sapiente aliquam quaerat, ab
            repellat eius. Quas, reiciendis error qui neque pariatur inventore
            obcaecati velit, officiis maiores corporis alias magnam molestias
            cum tenetur at, odio autem beatae modi exercitationem assumenda
            tempora. Error, sequi sunt quisquam architecto officiis voluptatibus
            quidem placeat ducimus ex vel est aut expedita praesentium corporis
            cumque quas? Magni hic sint tempora nisi explicabo cumque, aut autem
            excepturi suscipit qui saepe, enim nemo, temporibus quibusdam
            recusandae ratione maxime perferendis nulla. Enim excepturi harum
            fugit repudiandae reprehenderit odit cupiditate architecto vitae
            corrupti placeat quod rerum delectus voluptas labore maiores,
            obcaecati eveniet similique iste aut possimus? Obcaecati, optio, ea
            earum ut eligendi et aliquam sit veritatis a, minima ratione dolores
            distinctio labore repudiandae deserunt totam nisi! Quos blanditiis
            nam quae dolorum eum magnam cum recusandae cupiditate veritatis non
            nobis in alias, illum animi quisquam aliquid vitae cumque dolor
            excepturi repudiandae laudantium nulla sit? Nobis porro corrupti
            voluptas ullam optio ex? A repellendus, eos illo eum temporibus
            distinctio ullam nisi voluptas consequuntur, asperiores aliquid
            laborum eligendi, iure natus at recusandae beatae aperiam dolorum
            quas eaque quos porro officiis? Earum rerum saepe assumenda
            repellendus est eum, rem sed nisi sapiente fugiat sunt aperiam
            inventore perferendis nobis, quae pariatur adipisci aliquid deleniti
            doloremque culpa aliquam? Ut in, distinctio ab incidunt ad tempora
            repellendus hic totam beatae harum adipisci. Corporis repellendus
            iure, blanditiis quibusdam et id aut, eum odit incidunt sit porro
            laborum. Officiis placeat laudantium excepturi fugiat quia iste,
            ipsam dicta nam perspiciatis error fuga ullam ut corrupti explicabo
            aperiam magnam amet ratione nemo debitis itaque ipsa quos! Facilis
            exercitationem sequi, odio eos nihil deserunt necessitatibus iure
            tenetur unde eaque temporibus sint reprehenderit. Voluptate sunt hic
            animi nostrum culpa. Similique nobis repellat tenetur id eius eum
            ipsa sunt recusandae distinctio obcaecati, architecto ea maxime?
            Ratione, suscipit velit vero eveniet soluta perspiciatis, ipsum
            aliquid exercitationem quia in dignissimos dolor repudiandae
            expedita molestiae dolorem. Esse at sapiente ullam nam odio, ipsum
            quis laboriosam quibusdam facere sint consectetur nihil ipsam
            accusamus optio quos architecto. Laboriosam obcaecati corporis
            tenetur corrupti quas quae debitis impedit minus eum dignissimos
            quam voluptate reprehenderit accusantium aperiam sequi praesentium
            eveniet, alias natus, consequatur atque. Molestias reiciendis
            dolorum odio nostrum. Adipisci laborum rerum eveniet laboriosam ab
            tempore ut dolorem dolorum fuga, distinctio accusamus autem, dolores
            totam, voluptatibus ipsam nobis. Sed praesentium, cupiditate illum
            non nulla laudantium laborum esse. Error, sequi officia? Qui nostrum
            dolore fuga accusantium possimus distinctio inventore ad delectus
            assumenda, itaque et autem illo illum expedita officiis? Labore quos
            molestiae sunt dignissimos vel est pariatur nesciunt nisi iusto.
            Placeat, atque quisquam. Totam tenetur recusandae quo tempora quos
            vero nemo sapiente? Nisi vitae eius animi excepturi facere? Fuga
            aspernatur esse neque est laborum. Illum, molestiae eum magni
            accusantium quasi inventore provident voluptatibus, accusamus
            pariatur aspernatur laudantium incidunt, sed similique! Excepturi
            tempore aut nostrum fugit vel. Ducimus?
          </p>
        </div>
      </div>
    </main>
  );
};

export default HomePage;

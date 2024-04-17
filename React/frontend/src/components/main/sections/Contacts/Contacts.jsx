import React from 'react';
import Sections from "@/components/headers/Sections";
import ContactLink from "@/components/main/sections/Contacts/ContactLink";

const Contacts = () => {
    const contactLinks = [
        {
            id: "trainer",
            title: "Добавить тренера",
            text: "Вы знаете отличного тренера по покеру? Тогда добавляйте!",
            textbtn: "Добавить"
        },
        {
            id: "fund",
            title: "Добавить фонд",
            text: "Знаете бекинговые фонды? Добавляйте в наш рейтинг!",
            textbtn: "Добавить"
        }
    ];

    return (
        <section id="contact" className="contact__wrap">
            <Sections clarification="Вам есть что сказать?" title="Давайте пообщяемся"
                      subtitle="Заполните форму и мы это обсудим"/>
            <div className="contact__box">
                {contactLinks.map((link, index) => (
                    <ContactLink key={index} id={link.id} title={link.title} text={link.text} textbtn={link.textbtn} />
                ))}
            </div>
        </section>
    );
};

export default Contacts;
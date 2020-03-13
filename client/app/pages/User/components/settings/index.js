import React from 'react';

const Settings = (props) => {
    return (
        <Container fluid className="p-0 pb-4 my-4 mb-0 h-100">
            <Container>
                <Media style={{marginTop: '-50px'}}>
<img
width={100}
height={100}
className="shadow align-self-center rounded-circle border border-white mr-3"
src={profile.avatar!=''? `/${profile.avatar}` : "/favicon.png"}
alt="Foto de perfil"
/>
<Media.Body className="align-self-center mt-4">
    <h5>{(profile.firstName!='' || profile.lastName!='')? `${profile.firstName} ${profile.lastName}`: profile.local.username}</h5>
    <p>{(profile.description!='')? profile.description: null}</p>
</Media.Body>
                </Media>
            </Container>
        </Container>
    );
}

export default Settings;